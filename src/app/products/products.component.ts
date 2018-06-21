import { Component } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { CategoryService } from '../shared/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/models/product.model';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  selectedCategory: string = "";

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute) {

    // Get all the products from Db and assign to this.products
    this.productService.getAllProducts()
      .valueChanges()
      .subscribe((products: any[]) => {
        this.products = products;

        // Get the category selected from the active route's query param
        this.activatedRoute.queryParamMap.subscribe(
          params => {
            this.selectedCategory = params.get('category');

        // Filter the products array based on the selected category
        // If no category selected, just return the original products array
        this.filteredProducts =
              (this.selectedCategory)
                ? this.products.filter(p => p.category === this.selectedCategory)
                : this.products;
          });
      });

    this.categories$ = this.categoryService.getCategories();
  }
}