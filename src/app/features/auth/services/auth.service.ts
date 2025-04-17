import { Injectable, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '@Environments/environment';
import { SignUpRequest } from '../models/requests/signUpRequest';
import { SignUpResponse } from '../models/responses/signUpResponse';
import { SignInRequest } from '../models/requests/signInRequest';
import { SignInResponse } from '../models/responses/signInResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  signUp(request: SignUpRequest) {
    return this.http.post<SignUpResponse>(
      `${this.baseUrl}/Auth/sign_up`,
      request,
      {
        withCredentials: true,
      }
    );
  }

  signIp(request: SignInRequest) {
    return this.http.post<SignInResponse>(
      `${this.baseUrl}/Auth/sign_in`,
      request,
      {
        withCredentials: true,
      }
    );
  }
}
