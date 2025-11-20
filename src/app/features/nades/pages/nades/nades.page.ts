import { Component, OnInit } from '@angular/core';
import { CarouselMapsComponent } from '../../components/carousel-maps/carousel-maps.component';
import { NgIf } from '@angular/common';
import { fadeInAnimation } from '@app/shared/animations/fadeInAnimation';
import { MiniMapComponent } from '@app/shared/components/advanceds/mini-map/mini-map.component';
@Component({
  selector: 'app-nades',
  standalone: true,
  imports: [CarouselMapsComponent, NgIf, MiniMapComponent],
  templateUrl: './nades.page.html',
  styleUrl: './nades.page.css',
  animations: [fadeInAnimation]
})
export class NadesPage implements OnInit {
  public selectedMap: string = '';
  
  ngOnInit(): void {
    console.log('NadesPage initialized');
  }
  onSelectMap(map: string) {
    console.log('Selected map:', map);
    this.selectedMap = map;
  }

}
