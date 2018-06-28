import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { AppUser } from '../Auth/user.model';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  // Fetch App user from Auth service
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(private authService: AuthService,
    private shoppingCartService: ShoppingCartService) {
  }

  // await cant be done in constructor, so implementing this in ngOnInit.
  // get the current cart 
  async ngOnInit() {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser)
    const cart$ = (await this.shoppingCartService.getCart()).snapshotChanges();

    cart$.subscribe(cart => {
      this.shoppingCartItemCount = 0;
      for (let productId in cart.payload.val().items) {
        this.shoppingCartItemCount += cart.payload.val().items[productId].quantity
      }
    });
  }
  onLogout() {
    this.authService.logout();
  }
}
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
