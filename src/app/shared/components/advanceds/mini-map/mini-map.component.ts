import { Component, input } from '@angular/core';
import { NgIf } from '@angular/common';
import { MiniMapAnimation } from '@app/shared/animations/mini-map.animation';

@Component({
  selector: 'app-mini-map',
  standalone: true,
  templateUrl: './mini-map.component.html', 
  styleUrl: './mini-map.component.css',
  animations: [MiniMapAnimation],
  host: { 
    '[@miniMap]': '',
    'class': 'block w-full' 
  }
})
export class MiniMapComponent {
  public map = input.required<string>();
}