import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { NotificationService } from '@app/core/services/notification.service';
import { Notification } from '@app/shared/models/notification.model';

import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { fadeInAnimation } from '@app/shared/animations/fadeInAnimation';

@Component({
  selector: 'notification-top-side',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations: [fadeInAnimation], // se quiser animações
})
export class NotificationTopSideComponent {
  notifications = this.notificationService.notifications;

  constructor(private notificationService: NotificationService) {}
}
