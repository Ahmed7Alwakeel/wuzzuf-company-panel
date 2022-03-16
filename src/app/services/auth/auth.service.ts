import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: Observable<firebase.User | null>
  userID:string=""
  
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
  sendEmailMsg(email:string) {
    return this.fireAuth.sendPasswordResetEmail(email)
  }
  resetPassword(code:string,newPassword:string){
    return this.fireAuth.confirmPasswordReset(code,newPassword)
  }
  // update(user:firebase.User){
  //   return this.fireAuth.
  // }
  
}
