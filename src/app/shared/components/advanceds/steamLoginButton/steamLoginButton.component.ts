import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'steam-login-button',
  standalone: true,
  imports: [],
  templateUrl: './steamLoginButton.component.html',
  styleUrl: './steamLoginButton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SteamLoginButtonComponent {}
