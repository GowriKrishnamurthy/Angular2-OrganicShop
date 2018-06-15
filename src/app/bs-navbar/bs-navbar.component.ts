import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  currentUser: firebase.User;
  constructor(private angularFireAuth: AngularFireAuth) {
    // Listen to furebase authentication state to receive current login
    this.angularFireAuth.authState.subscribe(
      user => {
        this.currentUser = user;
      }
    );
  }

  ngOnInit() {
  }

  onLogout() {
    this.angularFireAuth.auth.signOut();
  }
}