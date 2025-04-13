import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BasicInputComponent } from '@Components/HTMLBasics/BasicInput/BasicInput.component';
import { PrimaryButtonComponent } from '@Components/HTMLBasics/PrimaryButton/PrimaryButton.component';
import { SteamLoginButtonComponent } from '@Components/Advanceds/SteamLoginButton/SteamLoginButton.component';
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
  templateUrl: './Login.page.html',
  styleUrl: './Login.page.css',
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
