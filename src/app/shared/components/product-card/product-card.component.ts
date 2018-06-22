import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
  @Input('product') product:Product;
  @Input('showButtons') showButtons:boolean=false;
  
  constructor(private cartService:ShoppingCartService) { }

  onAddToCart(product:Product){
    
    let cartId=localStorage.getItem('cartId');
    // Check  if the cart iD is present. if not, create a new one and save it in local storage
    // And start adding selected products to shopping cart
    if(!cartId)
    {
      // returns a promise
      this.cartService.createCartId()
      .then(
        result=>{
          // Store the id of the newly created node in the local storage
          localStorage.setItem('cartId',result.key);

          // Add product to the newly created cart
        });
    }
    // Add product to the existing cart
    else{

    }
  }
}
