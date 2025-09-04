import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../core/products';
import { Iproducts } from '../core/iproduct';
import { CommonModule } from '@angular/common';
import { CartServis } from '../core/cart';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.scss'
})
export class Details implements OnInit{
private readonly _ActivatedRoute = inject(ActivatedRoute)
private readonly _Products = inject(Products)
private readonly _CartServis = inject(CartServis)
productDetails:Iproducts | null =null;
mainImage: string = '';
category?: { name: string };




ngOnInit(): void {
  
this._ActivatedRoute.paramMap.subscribe({
  next:(p)=> {
     let idProduct= p.get('id');
this._Products.getSpecificProducts(idProduct).subscribe({
next:(res)=> {
  
this.productDetails = res.data;
if (this.productDetails && this.productDetails.images && this.productDetails.images.length > 0) {
  this.mainImage = this.productDetails.images[0];
} else {
  this.mainImage = '';
}


}
})
    
  }
})
    
  

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
}
