import { LoginRespons } from './login-respons';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Authentication {
  userData: any = null;
  private readonly _HttpClient = inject(HttpClient);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}  

  sendRegisterData(data: object) {
    return this._HttpClient.post(
      `${environment.baseURL}/api/v1/auth/signup`,
      data
    );
  }

  sendLoginData(data: object): Observable<LoginRespons> {
    return this._HttpClient.post<LoginRespons>(
      `${environment.baseURL}/api/v1/auth/signin`,
      data
    );
  }

  saveUserData() {
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
    }
  }

  logOut(): void {
    localStorage.removeItem('userToken');
    this.userData = null;
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userToken') !== null;
    }
    return false;
  }

  forgotPassword(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseURL}/api/v1/auth/forgotPasswords`,
      data
    );
  }

  getResetCode(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseURL}/api/v1/auth/verifyResetCode`,
      data
    );
  }

  resetPassword(data: object): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseURL}/api/v1/auth/resetPassword`,
      data
    );
  }
}
