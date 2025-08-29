import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Authentication } from '../core/authentication';
import { CartServis } from '../core/cart';

@Component({
  selector: 'app-nav-blank',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.html',
  styleUrl: './nav-blank.scss'
})
export class NavBlank implements OnInit {

  readonly _Authentication = inject(Authentication);
  private readonly _CartServis = inject(CartServis);

  cartCount: number = 0;
  showSearch: boolean = false;
  searchTerm: string = '';

  ngOnInit(): void {
    if (this._Authentication.isLoggedIn()) {
      this._CartServis.GetLoggeduser().subscribe({
        next: (res) => {
          const count = res?.numOfCartItems ?? 0;
          this._CartServis.cartNumber.next(count);
        },
        error: () => {
          this._CartServis.cartNumber.next(0);
        }
      });
    }

    this._CartServis.cartNumber.subscribe({
      next: (data) => {
        this.cartCount = data;
      }
    });
  }

  get isLoggedIn(): boolean {
    return this._Authentication.isLoggedIn();
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.toLowerCase();
    document.dispatchEvent(new CustomEvent('searchProducts', { detail: this.searchTerm }));
  }
}





