import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: Observable<firebase.User | null>
  constructor(private fireAuth: AngularFireAuth) {
    this.user = fireAuth.user
  }

  signUp(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
  }
  
  logIn(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }
  logOut() {
    return this.fireAuth.signOut()
  }
}
