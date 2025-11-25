import { Component, input, signal, computed, output } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { MiniMapAnimation } from '@app/shared/animations/mini-map.animation';
import { Nade } from '@app/features/nades/models/nade.model';
import { NadeMarkerComponent } from './components/nade-marker/nade-marker.component';
import { NadeTooltipComponent } from './components/nade-tooltip/nade-tooltip.component';
import { NadeCreationTooltipComponent } from './components/nade-creation-tooltip/nade-creation-tooltip.component';
import { zoomInAnimation } from '@app/shared/animations/zoom-in.animation';
import { fadeInAnimation } from '@app/shared/animations/fade-in.animation';

export interface NadeGroup {
  position: { x: number; y: number };
  types: string[];
  nades: Nade[];
}

@Component({
  selector: 'app-mini-map',
  standalone: true,
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css',
  imports: [NadeMarkerComponent, NadeTooltipComponent, NadeCreationTooltipComponent, NgClass],
  animations: [MiniMapAnimation, zoomInAnimation, fadeInAnimation],
  host: {
    '[@miniMap]': '',
    'class': 'block'
  }
})
export class MiniMapComponent {
  public map = input.required<string>();
  public nades = input<Nade[]>([]);
  public isAddingNade = input<boolean>(false);

  public onMapClick = output<{ x: number, y: number }>();
  public onNadeCreated = output<{ title: string; type: string; description: string; position: { x: number; y: number } }>();
  public onCancelAdd = output<void>();

  public selectedGroup = signal<NadeGroup | null>(null);
  public selectedType = signal<string | null>(null);
  public hoveredNade = signal<Nade | null>(null);
  public tempPosition = signal<{ x: number; y: number } | null>(null);
  public tooltipPosition = signal<'above' | 'below'>('above');
  public hideAllNades = signal<boolean>(false);

  public nadeGroups = computed(() => {
    const groups: NadeGroup[] = [];
    const nades = this.nades();

    nades.forEach(nade => {
      if (!nade.endPosition) return;

      const existingGroup = groups.find(g =>
        Math.abs(g.position.x - nade.endPosition!.x) < 2 &&
        Math.abs(g.position.y - nade.endPosition!.y) < 2
      );

      if (existingGroup) {
        existingGroup.nades.push(nade);
        if (!existingGroup.types.includes(nade.type)) {
          existingGroup.types.push(nade.type);
        }
      } else {
        groups.push({
          position: nade.endPosition,
          types: [nade.type],
          nades: [nade]
        });
      }
    });

    return groups;
  });

  private hoverTimeout: any;

  selectGroup(group: NadeGroup) {
    this.selectedGroup.set(group);
    this.hoveredNade.set(null); // Reset hover when selecting a group

    // Auto-select type if only one exists
    if (group.types.length === 1) {
      this.selectedType.set(group.types[0]);
    } else {
      this.selectedType.set(null); // Reset type selection for mixed groups
    }
  }

  selectType(type: string) {
    this.selectedType.set(type);
  }

  deselectGroup() {
    this.selectedGroup.set(null);
    this.selectedType.set(null);
    this.hoveredNade.set(null);
  }

  onNadeHover(nade: Nade | null) {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }

    if (nade) {
      this.hoveredNade.set(nade);
    } else {
      // Delay hiding to allow moving to tooltip
      this.hoverTimeout = setTimeout(() => {
        this.hoveredNade.set(null);
      }, 100); // 100ms delay
    }
  }

  onTooltipHover(isHovering: boolean) {
    if (isHovering) {
      if (this.hoverTimeout) {
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = null;
      }
    } else {
      this.onNadeHover(null);
    }
  }

  handleMapClick(event: MouseEvent) {
    if (!this.isAddingNade()) return;
    this.hideAllNades.set(true);

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    // Calculate preferred position
    const tooltipHeight = 420; // Height of the tooltip + margin
    const spaceAbove = event.clientY;
    const spaceBelow = window.innerHeight - event.clientY;

    // Prefer above if it fits
    if (spaceAbove > tooltipHeight) {
      this.tooltipPosition.set('above');
    }
    // If not, check if it fits below
    else if (spaceBelow > tooltipHeight) {
      this.tooltipPosition.set('below');
    }
    // If neither fits well, pick the one with more space
    else {
      this.tooltipPosition.set(spaceAbove > spaceBelow ? 'above' : 'below');
    }

    this.tempPosition.set({ x, y });
    this.onMapClick.emit({ x, y });
    this.hideAllNades.set(false);
  }

  saveNewNade(data: { title: string; type: string; description: string }) {
    if (this.tempPosition()) {
      this.onNadeCreated.emit({
        ...data,
        position: this.tempPosition()!
      });
      this.tempPosition.set(null);
    }
  }

  cancelNewNade() {
    this.tempPosition.set(null);
    this.onCancelAdd.emit();
  }
}