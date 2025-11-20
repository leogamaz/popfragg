import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { environment } from '@Environments/environment';
import { AuthService } from '../../services/auth.service';
import { SteamAuthService } from '../../services/steamAuth.service';

@Component({
  selector: 'app-steam-callback',
  standalone: true,
  templateUrl: './steam-callback.component.html',
  styleUrl: './steam-callback.component.css'
})
export class SteamCallbackComponent implements OnInit {
  private readonly apiUrl = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private steamAuthService :SteamAuthService
  ) {}


ngOnInit() {
  const steamResponseParams = this.route.snapshot.queryParamMap;
  let httpParams = new HttpParams();
  steamResponseParams.keys.forEach(key => {
    httpParams = httpParams.set(key, steamResponseParams.get(key) as string);
  });

  this.steamAuthService.signInWithSteam(httpParams)
    .subscribe({
      next: (response) => {
        const target = response.newUser ? '/register' : '/profile';
        setTimeout(() => {
          this.router.navigateByUrl(target, { replaceUrl: true });
        }, 1000);
      },
      error: () => {
        if (this.router.url === '/login/steamcallback') {
          setTimeout(() => {
            this.router.navigateByUrl('/login', { replaceUrl: true });
          }, 1300);
        }
      }
    });
  }
}