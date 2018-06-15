import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth'; 

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
  }
  onLogin(){
    this.angularFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
}
