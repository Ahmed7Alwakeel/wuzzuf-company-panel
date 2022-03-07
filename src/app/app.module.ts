
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
import { DetailsCardComponent } from './components/shared/details-card/details-card.component';
import { JobApplicantsComponent } from './components/application/job-applicants/job-applicants.component';
import { ApplicationDetailsComponent } from './components/application/application-details/application-details.component';
import { QuillModule } from 'ngx-quill'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { DialogComponent } from './components/dialog/dialog.component';
import{AngularFireStorageModule} from '@angular/fire/storage'

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
    EditProfileComponent,
    DetailsCardComponent,
    JobApplicantsComponent,
    ApplicationDetailsComponent,
    SpinnerComponent,
    DialogComponent,
 
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    QuillModule.forRoot(),
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    MaterialModule,
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
