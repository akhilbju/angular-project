import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.services';
import { ToastService } from '../../../../toast/toast.services';

@Component({
  standalone: true,
  selector: 'app-google-callback',
  template: `<p>Signing in... Please wait.</p>`,
})
export class GoogleCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.apiService.googleLogin(code).subscribe({
        next: (response: any) => {
          if (response.isSuccess === true) {
            localStorage.setItem('token', response.token);
            this.toast.show('Login Successful!', 'success');
            this.router.navigate(['/home']);
          } else {
            this.toast.show('login Failed', 'error');
          }
        },
        error: (err) => {
          console.error('Google login failed', err);
        },
      });
    }
  }
}
