// notification.component.ts
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input() message?: string = '';
  @Input() type: 'error' | 'success' | 'info' | 'warning' = 'info';
  @Input() duration: number = 5000; // ms

  visible = true;
  private timer: any;

  ngOnInit(): void {
    this.timer = setTimeout(() => {
      this.visible = false;
    }, this.duration);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

  close(): void {
    this.visible = false;
    clearTimeout(this.timer);
  }
}
