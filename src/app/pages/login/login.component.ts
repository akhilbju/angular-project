import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../src/app/services/api.services';
import { Router } from '@angular/router';
import { ToastService } from '../../../../toast/toast.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toast: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.apiService.login(data).subscribe((response) => {
      if (response.isSuccess === true) {
        {
          localStorage.setItem('token', response.token);
          this.toast.show('Login Successful!','success');
          this.router.navigate(['/home']);
        }
      }
    });
  }

  loginWithGoogle() {
    console.log('Google login clicked');
  }

  loginWithFacebook() {
    console.log('Facebook login clicked');
  }
}
