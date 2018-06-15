import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AppUser } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  // Save the currently logged in user to the firebase db
  SaveUserToFirebaseDb(user: firebase.User) {
    this.db.object('/users' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }
  // Get user details from the firebase db
  GetUserFirebaseDb(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users' + uid);
  }

}
