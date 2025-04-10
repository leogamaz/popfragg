import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'steam-login-button',
  standalone: true,
  imports: [],
  templateUrl: './SteamLoginButton.component.html',
  styleUrl: './SteamLoginButton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SteamLoginButtonComponent {}
