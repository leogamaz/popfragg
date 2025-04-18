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

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {}

  async login(event: any) {
    this.submitError.set(null);
    this.isSubmitting.set(true);

    const request = this.request(); // ← pega os dados já validados
    this.authService.signIp(request).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.isSubmitting.set(false);
          this.submitSuccess.set(true);
          this.router.navigate(['']);
        }, 1300);
      },
      error: (error) => {
        setTimeout(() => {
          this.isSubmitting.set(false);
          this.submitError.set(
            'Erro ao fazer login. Verifique suas credenciais.'
          );
        }, 1300);
      },
    });
  }
}
