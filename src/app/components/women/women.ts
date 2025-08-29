import { Component, inject, OnInit } from '@angular/core';
import { Products } from '../core/products';
import { Iproducts } from '../core/iproduct';
import { CartServis } from '../core/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-women',
  imports: [RouterLink],
  templateUrl: './women.html',
  styleUrl: './women.scss'
})
export class Women implements OnInit {
  private readonly _Products = inject(Products);
    private readonly _CartServis = inject(CartServis)
  

  productData: Iproducts[] = [];
  filteredProducts: Iproducts[] = [];


ngOnInit(): void {
    this._Products.products$.subscribe({
      next: (data) => {
        this.filteredProducts = data.filter(
          (product) => product.category.name === "Women's Fashion"
        );
      }
    });
  }
  
    specificProducts(id:string):void {
    this._Products.getSpecificProducts(id).subscribe({
       next:(res)=>{
     

      }
    })

  }



  addToCart(id:string):void {
  this._CartServis.addProductsToCart(id).subscribe({
    next:(res)=> {
      console.log(res);
      if (res.status =='success') {
              
      this._CartServis.cartNumber.next(res.numOfCartItems);
      }

    }
  })
}
}
