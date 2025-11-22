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
      } @else if (type === 'he') { <svg viewBox="101.066 91.775 278.51 282.4451" [class]="size + ' text-red-500'" fill="#3BD152">
          <path d="M 267 230 C 288 255 326 290 327 294 C 253.671 366.744 244.441 371.562 231.363 373.478 C 218.284 375.406 205.672 373.576 193.514 368.001 C 181.356 362.426 169.395 353.768 157.63 342.003 C 145.865 330.251 137.195 318.289 131.632 306.119 C 126.069 293.962 124.239 281.288 126.155 268.111 C 128.071 254.946 134.604 242.776 206 177 Z M 224.817 138.908 L 164.913 153.497 L 121.133 196.675 L 107.759 231.945 L 101.066 225.559 L 108.668 185.733 L 157.925 136.169 L 225.235 110.933 L 224.928 110.319 L 242.562 92.684 L 296.683 91.775 L 324.658 119.75 L 318.886 125.829 L 295.467 149.236 L 270.832 124.601 L 261.106 124.601 L 246.811 138.895 L 237.085 138.895 L 224.817 138.908 Z M 347.057 221.912 L 338.24 230.729 C 347.77 256.273 346.433 274.294 326.158 294.557 C 296.353 264.961 263 225 205 178 C 224.781 156.012 243.176 152.085 268.916 161.406 L 277.734 152.588 L 347.057 221.912 Z Z M 378.975 164.451 L 379.576 182.086 L 347.647 214.322 L 338.522 204.891 L 294.435 161.111 L 285.311 151.986 L 317.547 119.75 L 335.182 120.364 L 378.975 164.451 Z M 367.36 171.92 m -7.273 0 a 7.273 7.564 0 1 0 14.546 0 a 7.273 7.564 0 1 0 -14.546 0 Z" />
        </svg>
      }
    </ng-template>
  `
})
export class NadeMarkerComponent {
  public types = input.required<string[]>();
}
