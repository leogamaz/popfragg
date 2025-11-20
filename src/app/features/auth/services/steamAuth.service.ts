import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { environment } from '@Environments/environment';


@Injectable({
  providedIn: 'root',
})
export class SteamAuthService {
  private readonly apiUrl = environment.apiUrl;
  // Use o frontendOrigin para o 'openid.return_to'
  private readonly frontEndOrigin = environment.frontendOrigin; 
  private baseUrl = environment.apiUrl;
  // ... constructor ...
  constructor(private http: HttpClient) {}

  startSteamAuthentication() {
    // ⚠️ ATENÇÃO: A URL de retorno agora é o frontend
    const steamCallbackUrl = `${this.frontEndOrigin}/login/steamcallback`;

    const params = new URLSearchParams({
      'openid.ns': 'http://specs.openid.net/auth/2.0',
      'openid.mode': 'checkid_setup',
      // Novo return_to: Rota do Angular
      'openid.return_to': steamCallbackUrl, 
      // O realm DEVE ser o frontend origin se 'return_to' for o frontend
      'openid.realm': this.frontEndOrigin, 
      'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
      'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select',
    });
    
    const steamLoginUrl = `https://steamcommunity.com/openid/login?${params.toString()}`;
    
    // Redireciona a página inteira
    window.location.href = steamLoginUrl; 
  }
  signInWithSteam(httpParams :HttpParams ) {
    return this.http.get<{ newUser: boolean }>(
      `${this.baseUrl}/api/Auth/sign_in_steam`,
      {
        params: httpParams,
        withCredentials: true,
      }
    );
  }
}
