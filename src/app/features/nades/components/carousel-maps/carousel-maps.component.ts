import { Component, signal, output, input, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'carousel-maps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel-maps.component.html',
  styleUrl: './carousel-maps.component.css'
})
export class CarouselMapsComponent {

  selectedMap = output<string | null>();
  collapseDone = output<void>();

  selected = signal<string | null>(null);

  collapsed = input<boolean>(false);
  currentMap = input<string | null>(null);
  isCollapsed = signal<boolean>(false);

  constructor() {
    effect(() => {
      const isCollapsed = this.collapsed();
      this.isCollapsed.set(isCollapsed);

      const map = this.currentMap();
      if (map) {
        this.selected.set(map);
      }
    }, { allowSignalWrites: true });
  }
  isExiting = signal<boolean>(false);
  isDeckExiting = signal<boolean>(false);
  isExpanding = signal<boolean>(false);

  maps = [
    { id: 'de_mirage', name: 'Mirage' },
    { id: 'de_nuke', name: 'Nuke' },
    { id: 'de_overpass', name: 'Overpass' },
    { id: 'de_inferno', name: 'Inferno' },
    { id: 'de_dust2', name: 'Dust2' },
    { id: 'de_train', name: 'Train' },
    { id: 'de_cache', name: 'Cache' },
    { id: 'de_vertigo', name: 'Vertigo' },
    { id: 'de_anubis', name: 'Anubis' },
    { id: 'de_ancient', name: 'Ancient' },
  ];

  onCardClick(mapId: string) {
    if (this.isCollapsed()) {
      this.expand();
      return;
    }

    this.selected.set(mapId);
    this.selectedMap.emit(mapId);
    this.isExiting.set(true);

    setTimeout(() => {
      this.isExiting.set(false);
      this.isCollapsed.set(true);
      this.collapseDone.emit();
    }, 400);
  }

  expand() {
    this.isDeckExiting.set(true);

    setTimeout(() => {
      this.isDeckExiting.set(false);
      this.isCollapsed.set(false);
      this.selected.set(null);
      this.selectedMap.emit(null);

      this.isExpanding.set(true);

      setTimeout(() => {
        this.isExpanding.set(false);
      }, 600);

    }, 300);
  }
}