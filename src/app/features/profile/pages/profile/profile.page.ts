import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '@app/shared/components/icon/IconComponent/IconComponent.component';
import { HeaderComponent } from '@app/shared/layout/pages/header/header.component';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IconComponent, HeaderComponent],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {}
