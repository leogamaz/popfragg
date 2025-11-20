import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '@Environments/environment';
import { Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './shared/layout/components/header/header.component';
import { filter } from 'rxjs/operators';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'popfragg';
  env = environment; // Expose the environment variable to the template
  showHeader = false;
  
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.router.routerState.root.firstChild;
        this.showHeader = currentRoute?.snapshot.data['showHeader'] !== false;
      });
  }
  // redirect() {
  //   this.router.navigate(['/login']);
  // }
}
