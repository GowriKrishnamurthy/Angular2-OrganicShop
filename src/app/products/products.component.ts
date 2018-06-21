import { Component } from '@angular/core';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products$;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAllProducts().valueChanges();
  }
}