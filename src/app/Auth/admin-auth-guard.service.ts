import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private userService: UserService,
    private router: Router) { }

  canActivate(): Observable<boolean> {
    // GetUserFirebaseDb returns firebase object  observable and not the actual app user object.
    // switchMap - transforms from AngularFireObject<AppUser> observable to AppUser object
    // map -  transforms from app user object to boolean after checking if app user is admin 
    return this.authService.currentUser$
      .pipe(switchMap(user => this.userService.GetUserFirebaseDb(user.uid).valueChanges()))
      .pipe(map(appUser => {
        if (appUser.isAdmin)
          return true;
        else {
          this.router.navigate(['error']);
          return false;
        }
      }));
  }
}