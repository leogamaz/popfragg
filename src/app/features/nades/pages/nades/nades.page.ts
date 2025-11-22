import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselMapsComponent } from '../../components/carousel-maps/carousel-maps.component';
import { MiniMapComponent } from '@app/shared/components/advanceds/mini-map/mini-map.component';
import { leftToRightAnimation } from '@app/shared/animations/lef-to-right.animation';
import { Nade } from '@app/features/nades/models/nade.model';

@Component({
  selector: 'app-nades',
  standalone: true,
  imports: [CommonModule, CarouselMapsComponent, MiniMapComponent],
  templateUrl: './nades.page.html',
  styleUrl: './nades.page.css',
  animations: [leftToRightAnimation]
})
export class NadesPage {
  public selectedMap: string | null = null;
  public mapVisible: boolean = false;

  private ribbonFinished: boolean = false;
  private carouselFinished: boolean = false;

  public currentMapNades: Nade[] = [];

  // Mock Data
  private allNades: Nade[] = [
    {
      title: 'Stairs Smoke (Spawn)',
      visibility: 'public',
      accuracyLevel: 'high',
      technique: 'jumpthrow',
      description: 'Essential smoke for A site execution from T Spawn.',
      side: 'T',
      map: 'de_mirage',
      type: 'molotov',
      videoUrl: 'https://www.youtube.com/embed/xyz123',
      tags: ['A Site', 'Execute'],
      images: [],
      rating: 5,
      accesses: [],
      startPosition: { x: 36, y: 75 }, // T Spawn area
      endPosition: { x: 62, y: 44 }   // Stairs
    },
    {
      title: 'Stairs Smoke (Palace)',
      visibility: 'public',
      accuracyLevel: 'medium',
      technique: 'stand',
      description: 'Alternative smoke for Stairs from Palace.',
      side: 'T',
      map: 'de_mirage',
      type: 'flash',
      rating: 3,
      videoUrl: 'https://www.youtube.com/embed/xyz123',
      tags: ['A Site', 'Execute'],
      images: [],
      accesses: [],
      startPosition: { x: 65, y: 80 }, // Palace area
      endPosition: { x: 62, y: 45 }   // Stairs (Same end position)
    },
    {
      title: 'Jungle Smoke',
      visibility: 'public',
      accuracyLevel: 'high',
      technique: 'stand',
      description: 'Blocks vision from Jungle and Connector.',
      side: 'CT',
      map: 'de_mirage',
      type: 'smoke',
      videoUrl: 'https://www.youtube.com/embed/abc456',
      tags: ['Mid', 'A Site'],
      rating: 4,
      images: [],
      accesses: [],
      startPosition: { x: 30, y: 78 }, // T Spawn area
      endPosition: { x: 58, y: 48 }   // Jungle
    },
    {
      title: 'Window Flash',
      visibility: 'public',
      accuracyLevel: 'medium',
      technique: 'runthrow',
      description: 'Blinds sniper in window.',
      side: 'CT',
      map: 'de_mirage',
      type: 'he',
      videoUrl: null,
      tags: ['Mid'],
      rating: 2.5,
      images: [],
      accesses: [],
      startPosition: { x: 45, y: 60 }, // Top Mid
      endPosition: { x: 50, y: 50 }   // Window
    }
  ];

  onSelectMap(map: string | null) {
    console.log('Selected map:', map);
    this.selectedMap = map;

    if (map) {
      this.mapVisible = false;
      this.ribbonFinished = false;
      this.carouselFinished = false;
      this.currentMapNades = this.allNades.filter(n => n.map === map);
    } else {
      this.mapVisible = false;
      this.currentMapNades = [];
    }
  }

  onRibbonAnimationDone(event: any) {
    if (event.toState === 'void') {
      this.ribbonFinished = true;
      this.checkAndShowMap();
    }
  }

  onCarouselCollapseDone() {
    this.carouselFinished = true;
    this.checkAndShowMap();
  }

  private checkAndShowMap() {
    if (this.ribbonFinished && this.carouselFinished && this.selectedMap) {
      this.mapVisible = true;
    }
  }
}