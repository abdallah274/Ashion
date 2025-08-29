import { Component, inject, OnInit } from '@angular/core';
import { Authentication } from '../core/authentication';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.html',
  styleUrl: './account.scss'
})

export class Account implements OnInit {
  readonly _Authentication = inject(Authentication);
  user: any = null;

  ngOnInit(): void {
    this._Authentication.saveUserData();  
    this.user = this._Authentication.userData;
  }
}
