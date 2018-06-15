import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Getting the current logon of type Observable as we are fetching 
  // the auth info from Firebase asynchronously
  currentUser$: Observable<firebase.User>;
  private returnUrl;

  constructor(private angularFireAuth: AngularFireAuth,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {
    this.currentUser$ = this.angularFireAuth.authState;

    //getRedirectResult -Returns a UserCredential from the redirect-based sign-in flow.
    angularFireAuth.auth.getRedirectResult()
      .then(resolve => {
        if (resolve.user) {
          // Store the logged in user in firebase as user of this app
          userService.SaveUserToFirebaseDb(resolve.user);
          this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/';
          router.navigateByUrl(this.returnUrl);
        }
      })
      .catch(error => console.log(error));
  }

  login() {
    //Login with Google
    this.angularFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
