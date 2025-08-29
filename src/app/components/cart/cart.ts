import { RouterLink } from '@angular/router';
import { Icart } from '../core/icart';
import {  CartServis } from './../core/cart';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  imports: [RouterLink], 
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit {
private readonly _CartServis = inject(CartServis)


cartData:Icart={} as Icart;

ngOnInit(): void {
  this._CartServis.GetLoggeduser().subscribe({
    next:(res)=> {
      this.cartData = res.data;
    }
  })
}
productRemove(id:string):void {
  this._CartServis.RemoveSpecificCartItem(id).subscribe({
    next:(res)=> {
      this.cartData = res.data;
      this._CartServis.cartNumber.next(res.numOfCartItems)
    }
  })

}

clearProducts():void {
  this._CartServis.clearAllProducts().subscribe({
    next:(res)=> {
       this._CartServis.cartNumber.next(0)

if(res.message == 'success'){
this.cartData={} as Icart;
}

    }
  })

}

updateCart(id:string , count:number):void {
if(count > 0) {
    this._CartServis.updateCount(id , count).subscribe({
        next:(res)=> {
      this.cartData = res.data;
    }
  })
}
}
}
