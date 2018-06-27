import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  createProduct(product) {
    this.db.list('/products').push(product);
  }

  getAllProducts() {
    // Get all products from the firebase Db
    return this.db.list('/products').snapshotChanges()
      .pipe(map(action => {
        return action.map(item => {
          const key = item.payload.key;
          const data = { key, ...item.payload.val() };
          return data;
        });
      }));
  }
  getProductById(productId) {
    // Get all products from the firebase Db based on a product ID
    return this.db.object('/products/' + productId);
  }

  updateProduct(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  deleteProduct(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
