import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nade-marker',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (types().length === 1) {
      <ng-container *ngTemplateOutlet="iconTemplate; context: { $implicit: types()[0], size: 'w-4 h-4' }"></ng-container>
    } @else {
      <div class="flex flex-wrap justify-center items-center w-full h-full p-0.5">
        @for (type of types(); track type) {
          <div [class]="types().length > 2 ? 'w-1/2 h-1/2 flex justify-center items-center' : 'w-1/2 flex justify-center items-center'">
             <ng-container *ngTemplateOutlet="iconTemplate; context: { $implicit: type, size: types().length > 2 ? 'w-2.5 h-2.5' : 'w-3 h-3' }"></ng-container>
          </div>
        }
      </div>
    }

    <ng-template #iconTemplate let-type let-size="size">
      @if (type === 'smoke') {
        <svg viewBox="0 0 24 24" [class]="size + ' text-gray-400'" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z" />
        </svg>
      } @else if (type === 'flash') {
        <svg viewBox="0 0 24 24" [class]="size + ' text-yellow-400'" fill="currentColor">
          <path d="M7 2v11h3v9l7-12h-4l4-8z" />
        </svg>
      } @else if (type === 'molotov') {
        <svg viewBox="0 0 24 24" [class]="size + ' text-red-500'" fill="currentColor">
          <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
        </svg>
      } @else if (type === 'he') {
        <svg viewBox="0 0 24 24" [class]="size + ' text-green-500'" fill="currentColor">
          <path d="M12,22a7,7,0,0,1-7-7c0-2.9,1.77-5.4,4.29-6.51L8,5V2h8V5l-1.29,3.49C17.23,9.6,19,12.1,19,15A7,7,0,0,1,12,22ZM10.5,8h3V6h-3Zm-4-3H8V8H6.5Z" />
        </svg>
      }
    </ng-template>
  `
})
export class NadeMarkerComponent {
  public types = input.required<string[]>();
}
