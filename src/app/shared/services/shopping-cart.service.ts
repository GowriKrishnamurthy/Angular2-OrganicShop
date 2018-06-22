import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }
  
  createCartId()
  {
    // Create a new shopping cart id in firebase db under /shopping-carts
    return this.db.list('/shopping-carts').push({
      dateCreated:new Date().getTime()
    });
  }
}
