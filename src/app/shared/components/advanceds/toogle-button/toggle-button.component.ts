import { ChangeDetectionStrategy, Component, model } from '@angular/core';

@Component({
  selector: 'button[toggle-button]',
  standalone: true,
  imports: [],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-pressed]': 'checked()',
    '(click)': 'toggle()'
  }
})
export class ToggleButtonComponent {
  checked = model<boolean>(false);

  toggle() {
    this.checked.update(valorAtual => !valorAtual);
  }
}