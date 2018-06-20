import { Component, OnDestroy } from '@angular/core';

import { map } from 'rxjs/operators';

import { Subscription } from 'rxjs/Subscription';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { DataTableResource, DataTable } from 'angular5-data-table';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {

  subscription: Subscription;
  tableResource: DataTableResource<Product>;

  // Observable to retreive products from the DB
  products: Product[];

  // items and itemCount are referred in the HTML template
  items: Product[] = [];
  itemCount: number = 0;

  // Subscription added to listen to any changes in the products list  in any other page
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAllProducts()
      .snapshotChanges()
      .pipe(map(actions => {
        const newActions = [];
        actions.forEach(action => {
          const $key = action.key;
          const data = { $key, ...action.payload.val() };
          newActions.push(data);
        });
        return newActions;
      }))
      .subscribe((products: any[]) => {
        this.products = products;
        this.initializeTable(products);
      });
  }

  // Initialize the table with the products from DB
  private initializeTable(productsFromDB: Product[]) {
    this.products = productsFromDB;
    this.tableResource = new DataTableResource(productsFromDB);

    // Get the first 10 products and show them on the main page.
    this.tableResource.query({ offset: 0, limit: 10 })
      .then(items => (this.items = items));

    // Get the total number of records from the table
    this.tableResource.count()
      .then(count => (this.itemCount = count));
  }

  // reload event occurs everytime the page changes by sorting, paging, etc
  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params).then(items => this.items = items);
  }

  // Filtering based on the column clicked.
  filter(query: string) {
    // Apply filter only if the filterString is not null
    // if no filter strin - return the original product
    // otehrwise call this same filter method on original products array 
    let filteredProducts = (query)
      ? this.products.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase())
      )
      : this.products;

    // Load the table with new filtered products list
    this.initializeTable(filteredProducts);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

