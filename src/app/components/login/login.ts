
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Authentication } from '../core/authentication';
import { LoginRespons } from '../core/login-respons';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

private readonly _FormBuilder = inject(FormBuilder)
private readonly _Router = inject(Router)
private readonly _Authentication = inject(Authentication)
private readonly _ToastrService = inject(ToastrService)



loginForm: FormGroup = this._FormBuilder.group({
  email:[null , [Validators.required, Validators.email]],
  password:[null,[Validators.required , Validators.pattern(/^\w{6,}$/)] ],
})


loginSubmit(): void {
  this._Authentication.sendLoginData(this.loginForm.value).subscribe({
    next: (res: LoginRespons) => {
      if (res.message === 'success') {
        this._ToastrService.success(`Welcome ${res.user.name} You have successfully signed in.', 'Login Successful`);

        localStorage.setItem('userToken', res.token);
        this._Authentication.saveUserData();

        this._Router.navigate(['/home']);
      }
    },
    error: () => {
      this._ToastrService.error('Invalid email or password. Please try again.', 'Login Failed');
    }
  });
}



}

