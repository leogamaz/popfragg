import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '@app/shared/components/icon/IconComponent/IconComponent.component';
import { UserButtonComponent } from '../user-button/user-button.component';
import { PrimaryButtonComponent } from '@app/shared/components/HTMLBasics/primaryButton/primaryButton.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconComponent, UserButtonComponent, PrimaryButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
