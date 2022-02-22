import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCJjC0k7nIJioNPfPOEOkERiXUrSKUBxFA",
      authDomain: "ecommerce-89045.firebaseapp.com",
      projectId: "ecommerce-89045",
      storageBucket: "ecommerce-89045.appspot.com",
      messagingSenderId: "294637497403",
      appId: "1:294637497403:web:41ef88820e3562748e401e",
      measurementId: "G-EPT82TS0X8"
    }),
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
