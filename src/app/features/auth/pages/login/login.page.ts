import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { BasicInputComponent } from '@Components/HTMLBasics/basicInput/basicInput.component';
import { PrimaryButtonComponent } from '@Components/HTMLBasics/primaryButton/primaryButton.component';
import { SteamLoginButtonComponent } from '@Components/advanceds/steamLoginButton/steamLoginButton.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  SignInRequest,
  signInSchema,
} from '../../models/requests/signInRequest';
import { LoadingComponent } from '@app/shared/components/advanceds/Loading/loading/loading.component';
import { NotificationTopSideComponent } from '@app/shared/components/advanceds/notificications/topSide/notification.component';
import { NotificationService } from '@app/core/services/notification.service';

import { SteamAuthService } from '../../services/steamAuth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    BasicInputComponent,
    PrimaryButtonComponent,
    SteamLoginButtonComponent,
    LoadingComponent,
    FormsModule,
    RouterModule,
    CommonModule,
    NotificationTopSideComponent,
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  isSubmitting = signal(false);
  submitError = signal<string | null>(null);
  submitSuccess = signal(false);

  email = signal<string>('');
  password = signal<string>('');

  readonly request = computed<SignInRequest>(() =>
    signInSchema.parse({
      email: this.email(),
      password: this.password(),
    })
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService,
    private steamAuthService: SteamAuthService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['loginError'] === 'steam') {
        this.notification.error('Login com a steam falhou');
      }
    });
  }

  async login(event: any) {
    this.submitError.set(null);
    this.isSubmitting.set(true);

    const request = this.request(); // ← pega os dados já validados
    this.authService.signIp(request).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.isSubmitting.set(false);
          this.submitSuccess.set(true);
          this.router.navigate(['/profile']);
        }, 1300);
      },
      error: (error) => {
        setTimeout(() => {
          this.isSubmitting.set(false);
          this.notification.error('Login Inválido');
        }, 1300);
      },
    });
  }

  signInWithSteam() {
    this.steamAuthService.startSteamAuthentication();
  }
}
