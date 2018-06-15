import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFireDatabase: AngularFireDatabase) {  }
  // Save the currently logged in user to the firebase db
  SaveUserToFirebaseDb(user:firebase.User){
    this.angularFireDatabase.object('/users'+user.uid).update({
      name:user.displayName,
      email:user.email
    });
  }
}
