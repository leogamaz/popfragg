import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'label[main-label]',
  standalone: true,
  imports: [],
  templateUrl: './mainLabel.component.html',
  styleUrl: './mainLabel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLabelComponent {}
