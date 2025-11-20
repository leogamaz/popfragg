import { Component } from '@angular/core';
import { signal, output } from '@angular/core';
@Component({
  selector: 'carousel-maps',
  standalone: true,
  imports: [],
  templateUrl: './carousel-maps.component.html',
  styleUrl: './carousel-maps.component.css'
})
export class CarouselMapsComponent {

  selectedMap = output<string>();
  selected = signal<string | null>(null);

  onSelect(map: string) {
    this.selected.set(map);
    this.selectedMap.emit(map);
  }

}
