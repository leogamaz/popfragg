import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '@Environments/environment';
import { Router } from '@angular/router';
import { PrimaryButtonComponent } from './shared/components/HTMLBasics/primaryButton/primaryButton.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PrimaryButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private router: Router) {}

  title = 'popfragg';
  env = environment; // Expose the environment variable to the template

  redirect() {
    this.router.navigate(['/login']);
  }
}
