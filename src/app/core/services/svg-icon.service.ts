// svg-icon.service.ts
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SvgIconService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  getIcon(name: string, classList: string = ''): Observable<SafeHtml> {
    return this.http
      .get(`assets/icons/${name}.svg`, { responseType: 'text' })
      .pipe(
        map((svg) => {
          const injected = svg.replace(
            '<svg',
            `<svg class="${classList.trim()}"`
          );
          return this.sanitizer.bypassSecurityTrustHtml(injected);
        })
      );
  }
}
