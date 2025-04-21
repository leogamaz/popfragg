import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@Environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SteamAuthService {
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  steamAuthentication() {
    const width = 500;
    const height = 800;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const params = new URLSearchParams({
      'openid.ns': 'http://specs.openid.net/auth/2.0',
      'openid.mode': 'checkid_setup',
      'openid.return_to': this.apiUrl + '/Auth/sign_in_steam',
      'openid.realm': this.apiUrl,
      'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
      'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select',
    });
    const popup = window.open(
      `https://steamcommunity.com/openid/login?${params.toString()}`,
      '_blank',
      `width=${width},height=${height},left=${left},top=${top}`
    );
    window.addEventListener('message', (event) => {
      if (event.origin !== this.apiUrl) return;
      const steamId = event.data?.steamId;
    });
  }
}
