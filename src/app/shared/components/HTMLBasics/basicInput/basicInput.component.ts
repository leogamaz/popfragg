import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'input[basic-input]',
  standalone: true,
  imports: [],
  templateUrl: './basicInput.component.html',
  styleUrl: './basicInput.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInputComponent {}
