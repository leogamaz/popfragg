import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { fadeInAnimation } from '@app/shared/animations/fade-in.animation';
import { IconComponent } from '@Shared/components/icon/IconComponent/IconComponent.component';

@Component({
  selector: 'app-nade-marker',
  standalone: true,
  imports: [CommonModule, IconComponent],
  animations: [fadeInAnimation],
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
        <icon @fadeIn name="nades/smoke" [classList]="'w-4 h-4 text-gray-400'"></icon>
      } @else if (type === 'flash') {
        <icon @fadeIn name="nades/flash" [classList]="'w-4 h-4 text-yellow-400'"></icon>
      } @else if (type === 'molotov') {
        <icon @fadeIn name="nades/molotov" [classList]="'w-4 h-4 text-red-500'"></icon>
      } @else if (type === 'he') { 
        <icon @fadeIn name="nades/he" [classList]="'w-4 h-4 text-green-500'"></icon>
      }
    </ng-template>
  `
})
export class NadeMarkerComponent {
  public types = input.required<string[]>();
}
