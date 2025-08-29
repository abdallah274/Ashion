import { Component, inject } from '@angular/core';
import { Products } from '../components/core/products';
import { CartServis } from '../components/core/cart';
import { Iproducts } from '../components/core/iproduct';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-electronics',
  imports: [RouterLink], 
  templateUrl: './electronics.html',
  styleUrl: './electronics.scss'
})
export class Electronics {

    private readonly _Products = inject(Products);
    private readonly _CartServis = inject(CartServis)
  

  productData: Iproducts[] = [];
  filteredProducts: Iproducts[] = [];


ngOnInit(): void {
    this._Products.products$.subscribe({
      next: (data) => {
        this.filteredProducts = data.filter(
          (product) => product.category.name === "Electronics"
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
