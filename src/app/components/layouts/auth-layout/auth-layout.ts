import { Component } from '@angular/core';
import { NavBlank } from "../../nav-blank/nav-blank";
import { RouterOutlet } from '@angular/router';
import { NavAuth } from "../../nav-auth/nav-auth";

@Component({
  selector: 'app-auth-layout',
  imports: [ RouterOutlet, NavAuth],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss'
})
export class AuthLayout {

}
