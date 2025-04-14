import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  inject,
} from '@angular/core';
import { BasicInputComponent } from '@Components/HTMLBasics/BasicInput/BasicInput.component';
import { PrimaryButtonComponent } from '@Components/HTMLBasics/PrimaryButton/PrimaryButton.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StepAnimation } from '@Shared/Animations/RegisterAnimations';
import { AccountValidation } from '@Shared/Validators/AccountValidation';
import { CreateValidation } from '@Shared/Validators/CreateValidationHelper';
import { CreateReactiveField } from '@Shared/Validators/CreateReactiveFieldHelper';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

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
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  animations: [StepAnimation],
  templateUrl: './Register.page.html',
  styleUrl: './Register.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  private http = inject(HttpClient);
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

  constructor() {}

  register() {
    if (!this.validation.isValid() || !this.gameValidation.isValid()) return;

    this.isSubmitting.set(true);
    this.submitError.set(null);

    const payload = {
      Email: this.email(),
      GivenName: this.name(),
      FamilyName: this.lastName(),
      Password: this.password(),
      ConfirmPassword: this.confirmPassword(),
      Nickname: this.nickname(),
    };

    this.http.post(`${environment.apiUrl}Auth/sign_up`, payload).subscribe({
      next: () => {
        this.submitSuccess.set(true);
      },
      error: (err) => {
        this.submitError.set(err?.error?.message ?? 'Erro ao registrar.');
      },
      complete: () => {
        this.isSubmitting.set(false);
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
