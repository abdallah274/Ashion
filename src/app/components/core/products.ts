import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Products {
  private readonly _HttpClient = inject(HttpClient);

  private productsSource = new BehaviorSubject<any[]>([]);
  products$ = this.productsSource.asObservable();

  private searchTermSource = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSource.asObservable();

  getAllProducts(): void {
    this._HttpClient.get(`${environment.baseURL}/api/v1/products`).subscribe({
      next: (res: any) => {
        this.productsSource.next(res.data);
      }
    });
  }

  getSpecificProducts(id: string | null): Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}/api/v1/products/${id}`);
  }

  setSearchTerm(term: string) {
    this.searchTermSource.next(term);
  }
}
