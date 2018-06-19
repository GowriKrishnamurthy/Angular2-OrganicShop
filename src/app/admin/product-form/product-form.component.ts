import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../product.service';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  // Observable to get the categories from Firebase Db
  categories$;

  constructor(categoryService: CategoryService,
      private productService: ProductService,
      private router:Router) {
    this.categories$ = categoryService.getCategories();
  }

  onSave(product) {
    this.productService.createProduct(product);
    this.router.navigate(['/admin/products']);
  }
  ngOnInit() {
  }

}
