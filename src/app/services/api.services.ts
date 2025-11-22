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
  googleSignup(code: string): Observable<any> {
    return this.http.get(`${this.authBaseUrl}/api/Auth/GoogleSignIn?token=${code}`);
  }
  googleLogin(code: string): Observable<any> {
    return this.http.get(`${this.authBaseUrl}/api/Auth/GoogleLogin?token=${code}`);
  }
  getUrlLink(): Observable<any> {
    return this.http.get(
      `${this.authBaseUrl}/api/Auth/GetGoogleLink`,
    );
  }

  getRecommendedMovies(): Observable<any> {
    return this.http.get('http://localhost:5112/api/Home/GetRecommendedMovies');
  }

  streamVideo(movieId: string): Observable<Blob> {
    return this.http.get(`http://localhost:5112/api/Home/StreamVideo?movieId=${movieId}`, { responseType: 'blob' });
  }
}
