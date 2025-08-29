import { OrdersServis } from './../core/orders';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [ReactiveFormsModule], 
  templateUrl: './orders.html',
  styleUrl: './orders.scss'
})
export class Orders implements OnInit{
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersServis = inject(OrdersServis);


  cartId:string| null ="";
  cities: string[] = [
  'Cairo',
  'Giza',
  'Alexandria',
  'Mansoura',
  'Aswan',
  'Luxor',
  'Ismailia'
];

  
orderForm: FormGroup = this._FormBuilder.group({
  shippingAddress: this._FormBuilder.group({
    details: [null, [Validators.required, Validators.minLength(5)]],
    phone: [null, [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
    city: [null, [Validators.required]],
  })
});

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(parms)=> {
      this.cartId=parms.get('id');
    }
  })
}
onSubmit():void {
  console.log(this.orderForm.value);
this._OrdersServis.CheckoutSession(this.cartId , this.orderForm.get('shippingAddress')?.value).subscribe({
  next:(res)=> {
    console.log(res);
    if( res.status == 'success') {
   window.open(res.session.url , '_self')
    }
  }
})
  
}

}
