import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '@app/shared/layout/components/header/header.component';
import { SidebarComponent } from '@app/shared/layout/components/sidebar/sidebar.component';
import { IconComponent } from '@app/shared/components/icon/IconComponent/IconComponent.component';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, IconComponent],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {}
