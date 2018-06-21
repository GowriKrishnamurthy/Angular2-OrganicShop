import { Component } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products$;
  categories$;

  constructor(private productService: ProductService,
    private categoryService: CategoryService) {
    this.products$ = this.productService.getAllProducts().valueChanges();
    this.categories$ = this.categoryService.getCategories();
  }
}