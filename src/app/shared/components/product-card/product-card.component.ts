import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('showButtons') showButtons: boolean = false;
  @Input('shoppingCart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  onAddToCart() {
    this.cartService.addToCart(this.product);
  }
  
  getQuantity() {
    if (!this.shoppingCart) return 0;

    let item = this.shoppingCart.items[this.product.key];
    return item ? item['quantity'] : 0;
  }
}
