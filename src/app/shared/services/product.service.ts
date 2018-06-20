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
    return this.db.list('/products/',
    ref => ref.orderByChild('title')).snapshotChanges()
      .pipe(map(actions => {
        return actions
        .map(action => ({
          key: action.key,
          title: action.payload.val().title,
          imageUrl: action.payload.val().imageUrl,
          price: action.payload.val().price,
          category: action.payload.val().category
        }));
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
