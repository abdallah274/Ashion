import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Products } from '../core/products';
import { Iproducts } from '../core/iproduct';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CartServis } from '../core/cart';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy {
  private readonly _Products = inject(Products);
  private readonly _CartServis = inject(CartServis);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);

  subscription!: Subscription;
  productData: Iproducts[] = [];
  filteredProducts: Iproducts[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  private searchListener = (event: any) => {
    const term = event.detail.toLowerCase();
    if (!term) {
      this.filteredProducts = this.productData;
    } else {
      this.filteredProducts = this.productData.filter(p =>
        p.title.toLowerCase().includes(term)
      );
    }
    this.currentPage = 1;
  };

  ngOnInit(): void {
    this._NgxSpinnerService.show();
    this._Products.getAllProducts();
    this.subscription = this._Products.products$.subscribe({
      next: (data) => {
        this.productData = data;
        this.filteredProducts = this.productData;
        this._NgxSpinnerService.hide();
      }
    });

    document.addEventListener('searchProducts', this.searchListener);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    document.removeEventListener('searchProducts', this.searchListener);
  }

  specificProducts(id: string): void {
    this._Products.getSpecificProducts(id).subscribe({
      next: (res) => {}
    });
  }

  filterProducts(category: string): void {
    if (category === 'all') {
      this.filteredProducts = this.productData;
    } else {
      this.filteredProducts = this.productData.filter(
        (product) => product.category.name === category
      );
    }
  }

  addToCart(id: string): void {
    this._CartServis.addProductsToCart(id).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this._CartServis.cartNumber.next(res.numOfCartItems);
        }
      }
    });
  }

  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages() {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }
}
