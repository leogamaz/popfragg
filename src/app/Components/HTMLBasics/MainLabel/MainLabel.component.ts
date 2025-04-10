import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'label[main-label]',
  standalone: true,
  imports: [],
  templateUrl: './MainLabel.component.html',
  styleUrl: './MainLabel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLabelComponent {}
