import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from './environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServis {
  private readonly _HttpClient = inject(HttpClient);

  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    this.loadCartCount(); 
  }

  private loadCartCount(): void {
    this.GetLoggeduser().subscribe({
      next: (res) => {
        this.cartNumber.next(res.numOfCartItems); 
      },
      error: (err) => {
        console.error('Error loading cart count:', err);
      }
    });
  }

  addProductsToCart(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/api/v1/cart`, {
      productId: id
    }).pipe(
      tap((res: any) => {
        this.cartNumber.next(res.numOfCartItems);
      })
    );
  }

  GetLoggeduser(): Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}/api/v1/cart`);
  }

  RemoveSpecificCartItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart/${id}`).pipe(
      tap((res: any) => {
        this.cartNumber.next(res.numOfCartItems);
      })
    );
  }

  clearAllProducts(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart`).pipe(
      tap((res: any) => {
        this.cartNumber.next(0); 
      })
    );
  }

  updateCount(id: string, count: number): Observable<any> {
    return this._HttpClient.put(`${environment.baseURL}/api/v1/cart/${id}`, {
      count: count
    }).pipe(
      tap((res: any) => {
        this.cartNumber.next(res.numOfCartItems);
      })
    );
  }
}
