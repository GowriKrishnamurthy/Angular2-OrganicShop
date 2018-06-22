import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private createNewCart() {
    // Create a new shopping cart id in firebase db under /shopping-carts
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getExistingCart(cardId: string) {
    // Create a new shopping cart id in firebase db under /shopping-carts
    return this.db.object('/shopping-carts/' + cardId);
  }

  // To call the async method like sync methods.
  private async getOrCreateCart() {
    let cartId = localStorage.getItem('cartId');

    // Check  if the cart iD is present. if not, create a new one and save it in local storage
    if (!cartId) {
      let result = await this.createNewCart();

      // Store the id of the newly created node in the local storage
      localStorage.setItem('cartId', result.key);
      // Return the reference to the newly created cart
      return this.getExistingCart(result.key);
    }

    // Return the reference to the existing card
    return this.getExistingCart(cartId);
  }
}
