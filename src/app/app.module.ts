import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HandlingJobsComponent } from './components/handling-jobs/handling-jobs.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CardComponent } from './components/shared/card/card.component';
import { TopNavComponent } from './components/shared/top-nav/top-nav.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { JobDetailsComponent } from './components/handling-jobs/job-details/job-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HandlingJobsComponent,
    JobsComponent,
    SidebarComponent,
    DashboardComponent,
    NotFoundComponent,
    CardComponent,
    TopNavComponent,
    MainLayoutComponent,
    JobDetailsComponent,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
