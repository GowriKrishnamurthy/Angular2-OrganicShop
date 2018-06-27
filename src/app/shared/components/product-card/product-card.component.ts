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

  onAddToCart(){
    this.cartService.addToCart(this.product);
  } 
}
