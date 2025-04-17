import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'loading',
  standalone: true,
  imports: [],
  template: `
    <div class="container">
      <div class="loader"></div>
    </div>
  `,
  styleUrl: './loading.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {}
