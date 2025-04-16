import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'button[primary-button]',
  standalone: true,
  imports: [],
  templateUrl: './primaryButton.component.html',
  styleUrl: './primaryButton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryButtonComponent {}
