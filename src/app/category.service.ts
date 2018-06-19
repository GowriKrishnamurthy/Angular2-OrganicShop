import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) {
  }

  getCategories() {
    // get categories from firebase Db and sort values by name
    return this.db.list('/categories',
      ref => ref.orderByChild('name')).snapshotChanges();
  }
  
}