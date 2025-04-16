import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BasicInputComponent } from '@Components/HTMLBasics/basicInput/basicInput.component';
import { PrimaryButtonComponent } from '@Components/HTMLBasics/primaryButton/primaryButton.component';
import { SteamLoginButtonComponent } from '@Components/advanceds/steamLoginButton/steamLoginButton.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    BasicInputComponent,
    PrimaryButtonComponent,
    SteamLoginButtonComponent,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  email!: string; // Variável para armazenar o email
  senha!: string; // Variável para armazenar a senha

  isLoading = false;
  isError = '';
  checkingAuth = true;

  constructor() {}

  async ngOnInit() {}

  async login(event: any) {}
}
