import { Component, inject } from '@angular/core';
import { Products } from '../core/products';
import { CartServis } from '../core/cart';
import { Iproducts } from '../core/iproduct';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-men',
  imports: [RouterLink],
  templateUrl: './men.html',
  styleUrl: './men.scss'
})
export class Men {
  private readonly _Products = inject(Products);
    private readonly _CartServis = inject(CartServis)
  

  productData: Iproducts[] = [];
  filteredProducts: Iproducts[] = [];


ngOnInit(): void {
    this._Products.products$.subscribe({
      next: (data) => {
        this.filteredProducts = data.filter(
          (product) => product.category.name === "Men's Fashion"
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


