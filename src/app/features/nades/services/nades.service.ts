import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@Environments/environment';
import { Observable } from 'rxjs';
import { Nade } from '../models/nade.model';

@Injectable({
  providedIn: 'root'
})
export class NadesService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllNadesByUser(): Observable<Nade[]> {
    return this.http.get<Nade[]>(`${this.baseUrl}/api/Nades/get-all`);
  }
}
