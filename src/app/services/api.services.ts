import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {

    private authBaseUrl = 'http://localhost:5055';

  constructor(private http: HttpClient) {}


  login(payload: any): Observable<any> {
    return this.http.post(`${this.authBaseUrl}/api/Auth/Login`, payload);
  }
}
