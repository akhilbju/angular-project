import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {

  private baseUrl = 'http://api:5000';  

  constructor(private http: HttpClient) {}

  // Example: GET /api/values
  getValues(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/values`);
  }

  // Example: POST login
  login(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/login`, payload);
  }
}
