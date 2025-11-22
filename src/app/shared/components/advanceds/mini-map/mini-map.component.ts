import { Component, input, signal, computed } from '@angular/core';
import { NgIf } from '@angular/common';
import { MiniMapAnimation } from '@app/shared/animations/mini-map.animation';
import { Nade } from '@app/features/nades/models/nade.model';
import { NadeMarkerComponent } from './components/nade-marker/nade-marker.component';
import { NadeTooltipComponent } from './components/nade-tooltip/nade-tooltip.component';
export interface NadeGroup {
  position: { x: number; y: number };
  type: string;
  nades: Nade[];
}
@Component({
  selector: 'app-mini-map',
  standalone: true,
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css',
  imports: [NadeMarkerComponent, NadeTooltipComponent],
  animations: [MiniMapAnimation],
  host: {
    '[@miniMap]': '',
    'class': 'block w-full'
  }
})
export class MiniMapComponent {
  public map = input.required<string>();
  public nades = input<Nade[]>([]);
  public selectedGroup = signal<NadeGroup | null>(null);
  public hoveredNade = signal<Nade | null>(null);
  public nadeGroups = computed(() => {
    const groups: NadeGroup[] = [];
    const nades = this.nades();
    nades.forEach(nade => {
      if (!nade.endPosition) return;
      const existingGroup = groups.find(g =>
        Math.abs(g.position.x - nade.endPosition!.x) < 2 &&
        Math.abs(g.position.y - nade.endPosition!.y) < 2 &&
        g.type === nade.type
      );
      if (existingGroup) {
        existingGroup.nades.push(nade);
      } else {
        groups.push({
          position: nade.endPosition,
          type: nade.type,
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
}