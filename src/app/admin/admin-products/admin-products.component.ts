import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  //Observable to retreive products from db

  products: any[];
  filteredProducts: any[];
  subscription: Subscription;

  // Subscription added to listen to any changes in the products list  in any other page
  constructor(private productService: ProductService) {

    //On load of this page, before any filter string was provided,  filteredProducts will be same as products 
    this.subscription = this.productService.getAllProducts()
      .subscribe(
        products =>
          this.products = this.filteredProducts = products)
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Filtering based on title 
  filter(filterString: string) {
    // Apply filter only if the filterString is not null
    // if no filter strin - return the original product
    // otehrwise call this same filter method on original products array 
    this.filteredProducts = 
    (filterString) ?
      this.products.filter(p => p.payload.val().title.toLowerCase().includes(filterString.toLowerCase())) :
      this.products;
  }
}
