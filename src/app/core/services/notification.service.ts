import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

import { Notification } from '../../shared/models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private counter = 0;
  private _notifications = signal<Notification[]>([]);
  notifications = this._notifications.asReadonly();

  show(message: string, type: Notification['type'] = 'info', duration = 3000) {
    const id = this.counter++;
    const notification: Notification = { id, message, type, duration };

    this._notifications.update((current) => [...current, notification]);

    setTimeout(() => {
      this._notifications.update((current) =>
        current.filter((n) => n.id !== id)
      );
    }, duration);
  }

  success(msg: string, duration?: number) {
    this.show(msg, 'success', duration);
  }

  error(msg: string, duration?: number) {
    this.show(msg, 'error', duration);
  }

  info(msg: string, duration?: number) {
    this.show(msg, 'info', duration);
  }

  warning(msg: string, duration?: number) {
    this.show(msg, 'warning', duration);
  }
}
