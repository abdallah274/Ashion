import { Component, inject } from '@angular/core';
import { Authentication } from '../core/authentication';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-auth.html',
  styleUrls: ['./nav-auth.scss']
})
export class NavAuth {

  readonly _Authentication = inject(Authentication);

  get isLoggedIn(): boolean {
    return this._Authentication.isLoggedIn();
  }

  logOut(): void {
    this._Authentication.logOut();
  }
}





