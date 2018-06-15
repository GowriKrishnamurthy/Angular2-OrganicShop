import { Component } from '@angular/core';
import { AuthService } from '../Auth/auth.service';

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
 // Getting the current logon - Option 2
  // Change type of user to an Observable as we are fetching 
  // the auth info from Firebase asynchronously
  currentUser$: Observable<firebase.User>;
  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    // We will return an observable which then will be unwrapped using async pipe in template
    this.currentUser$ = this.angularFireAuth.authState;
  }
*/
  constructor(private authService:AuthService) { }

  onLogout(){
    this.authService.logout();
  }
}