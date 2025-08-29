import { Component } from '@angular/core';
import { NavBlank } from "../../nav-blank/nav-blank";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blank-layout',
  imports: [NavBlank, RouterOutlet],
  templateUrl: './blank-layout.html',
  styleUrl: './blank-layout.scss'
})
export class BlankLayout {

}
