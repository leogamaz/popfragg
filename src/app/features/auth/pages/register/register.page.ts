import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { BasicInputComponent } from '@Components/HTMLBasics/basicInput/basicInput.component';
import { PrimaryButtonComponent } from '@Components/HTMLBasics/primaryButton/primaryButton.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StepAnimation } from '@app/shared/animations/register.animations';
import { AccountValidation } from '@Validators/accountValidation';
import { CreateValidation } from '@Shared/validators/createValidationHelper';
import { CreateReactiveField } from '@Shared/validators/createReactiveFieldHelper';
import { NotificationTopSideComponent } from '@app/shared/components/advanceds/notificications/topSide/notification.component';
import { AuthService } from '../../services/auth.service';
import { SignUpRequest } from '../../models/requests/signUpRequest';
import { Router } from '@angular/router';
import { LoadingComponent } from '@app/shared/components/advanceds/Loading/loading/loading.component';
import { NotificationService } from '@app/core/services/notification.service';

enum StepsRegister {
  PERSONAL_INFO = 'personalInfo',
  GAME_INFO = 'gameInfo',
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    BasicInputComponent,
    PrimaryButtonComponent,
    CommonModule,
    FormsModule,
    NotificationTopSideComponent,
    LoadingComponent,
  ],
  animations: [StepAnimation],
  templateUrl: './register.page.html',
  styleUrl: './register.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  //Signals de controle de estado
  isSubmitting = signal(false);
  submitError = signal<string | null>(null);
  submitSuccess = signal(false);

  stepsRegister = StepsRegister;
  currentStep = signal(StepsRegister.PERSONAL_INFO);
  nextStep: StepsRegister | null = null;
  isAnimating = signal(false);

  // Signals de valores
  name = signal('');
  lastName = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  nickname = signal('');

  // Field controls com validação acoplada
  nameControl = CreateReactiveField(this.name, AccountValidation.validateName);
  lastNameControl = CreateReactiveField(
    this.lastName,
    AccountValidation.validateLastName
  );
  emailControl = CreateReactiveField(
    this.email,
    AccountValidation.validateEmail
  );
  passwordControl = CreateReactiveField(
    this.password,
    AccountValidation.validatePassword
  );
  confirmPasswordControl = CreateReactiveField(this.confirmPassword, (value) =>
    AccountValidation.validateConfirmPassword(this.password(), value)
  );
  nicknameControl = CreateReactiveField(
    this.nickname,
    AccountValidation.validateNickname
  );

  // Validação dos blocos
  validation = CreateValidation(
    {
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    },
    {
      name: AccountValidation.validateName,
      lastName: AccountValidation.validateLastName,
      email: AccountValidation.validateEmail,
      password: AccountValidation.validatePassword,
      confirmPassword: AccountValidation.validateConfirmPassword,
    }
  );

  gameValidation = CreateValidation(
    {
      nickname: this.nickname,
    },
    {
      nickname: AccountValidation.validateNickname,
    }
  );

  canSubmit = computed(
    () => this.validation.isValid() && this.gameValidation.isValid()
  );
  constructor(
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService
  ) {}

  async register() {
    if (!this.canSubmit()) return;

    this.isSubmitting.set(true);
    this.submitError.set(null);

    const payload: SignUpRequest = {
      email: this.email(),
      password: this.password(),
      confirmPassword: this.confirmPassword(),
      nickname: this.nickname(),
      givenName: this.name(),
      familyName: this.lastName(),
    };

    this.authService.signUp(payload).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.isSubmitting.set(false);
          this.router.navigate(['/login']);
        }, 1300);
      },
      error: (error) => {
        setTimeout(() => {
          this.isSubmitting.set(false);
          this.notification.error(error.error?.message ?? 'Erro ao registrar.');
        }, 1300);
      },
    });
  }

  changeStep(target: StepsRegister) {
    if (this.isAnimating()) return;
    this.nextStep = target;
    this.isAnimating.set(true);
  }

  onAnimationDone() {
    if (this.nextStep) {
      this.currentStep.set(this.nextStep);
      this.nextStep = null;
      this.isAnimating.set(false);
    }
  }
}
