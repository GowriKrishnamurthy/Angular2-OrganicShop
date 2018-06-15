import { Component } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  // Getting the current logon - Option 1
  /* currentUser: firebase.User;
  constructor(private angularFireAuth: AngularFireAuth) {
    // Listen to furebase authentication state to receive current login
    this.angularFireAuth.authState.subscribe(
      user => {
        this.currentUser = user;
      }
    );
    // unsubscribe is requried in this option
*/
  // Getting the current logon - Option 2
  // Change type of user to an Observable as we are fetching 
  // the auth info from Firebase asynchronously
  currentUser$: Observable<firebase.User>;
  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    // We will return an observable which then will be unwrapped using async pipe in template
    this.currentUser$ = this.angularFireAuth.authState;
  }

  onLogout() {
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['/']);
  }
  onLogin()
  {
    this.router.navigate(['/login']);
  }
}