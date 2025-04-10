import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BasicInputComponent } from '../../Components/HTMLBasics/BasicInput/BasicInput.component';
import { PrimaryButtonComponent } from '../../Components/HTMLBasics/PrimaryButton/PrimaryButton.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [BasicInputComponent, PrimaryButtonComponent, FormsModule],
  templateUrl: './Register.page.html',
  styleUrl: './Register.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {}
