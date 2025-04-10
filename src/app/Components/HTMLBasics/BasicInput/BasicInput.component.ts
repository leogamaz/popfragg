import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'input[basic-input]',
  standalone: true,
  imports: [],
  templateUrl: './BasicInput.component.html',
  styleUrl: './BasicInput.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInputComponent {}
