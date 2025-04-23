import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '@app/shared/components/icon/IconComponent/IconComponent.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
