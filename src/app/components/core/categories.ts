import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Categories {

  private readonly _HttpClient = inject(HttpClient);


  getCategories():Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}/api/v1/categories`)
  }
     getSpecificCategories(id:string):Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}/api/v1/categories/${id}`)
  }
  
}
