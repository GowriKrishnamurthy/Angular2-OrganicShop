import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'; /* to unlock map operator */

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  // Inject Auth service to get the current authentication status of the user
  // Inject Router service to let the users navigate to login page.

  constructor(private authService: AuthService,
    private router: Router) {
  }

  // if the user is logged in, return true. else navigate to login page
  // subscribe return an observable. To tranform the data to boolean , use map operator.
  // this.authService.currentUser$.subscribe(
  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(map(user => {
      if (user) { return true; }
      this.router.navigate(['/login']);
      return false;
    }));
  }
}
