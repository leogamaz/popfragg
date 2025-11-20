import { Component } from '@angular/core';
import { signal, input } from '@angular/core';
import { fadeInAnimation } from '@app/shared/animations/fadeInAnimation';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-mini-map',
  standalone: true,
  imports: [NgIf],
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css',
  animations:[fadeInAnimation]
})
export class MiniMapComponent {
  public map = input.required<string>();
}
