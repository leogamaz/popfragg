import { Component } from '@angular/core';
import { CarouselMapsComponent } from '../../components/carousel-maps/carousel-maps.component';
import { CommonModule } from '@angular/common';
import { MiniMapComponent } from '@app/shared/components/advanceds/mini-map/mini-map.component';
import { leftToRightAnimation } from '@app/shared/animations/lef-to-right.animation';

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

  onSelectMap(map: string | null) {
    console.log('Selected map:', map);
    this.selectedMap = map;

    if (map) {
      this.mapVisible = false;
      this.ribbonFinished = false;
      this.carouselFinished = false;
    } else {
      this.mapVisible = false;
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