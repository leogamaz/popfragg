import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'button[primary-button]',
  standalone: true,
  imports: [],
  templateUrl: './PrimaryButton.component.html',
  styleUrl: './PrimaryButton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryButtonComponent {}
