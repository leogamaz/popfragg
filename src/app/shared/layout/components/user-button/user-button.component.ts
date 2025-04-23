import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '@app/shared/components/icon/IconComponent/IconComponent.component';

@Component({
  selector: 'user-button',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './user-button.component.html',
  styleUrl: './user-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserButtonComponent {}
