import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersServis {
private readonly _HttpClient = inject(HttpClient)

  CheckoutSession(id:string | null , shippingDetails:object):Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
    "shippingAddress":shippingDetails
       }
    )
  }
}
