import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HandlingJobsComponent } from './components/handling-jobs/handling-jobs.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import { LoginGuard } from './guards/login/login.guard';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobDetailsComponent } from './components/handling-jobs/job-details/job-details.component';
import { AuthGuard } from './guards/auth.guard';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { JobApplicantsComponent } from './components/application/job-applicants/job-applicants.component';
import { ApplicationDetailsComponent } from './components/application/application-details/application-details.component';


const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] }, // ,canActivate:[LoginGuard]

  { path: "sign-up", component: SignUpComponent, canActivate: [LoginGuard] },// ,canActivate:[LoginGuard]

  {
    path: '', component: MainLayoutComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: "dashboard", component: DashboardComponent },
      { path: "add-jobs", component: HandlingJobsComponent },
      { path: "edit-jobs/:id", component: HandlingJobsComponent },
      { path: "jobs", component: JobsComponent },
      { path: "job-detail/:id", component: JobDetailsComponent },
      { path: "edit-profile", component: EditProfileComponent },
      { path: "applications/:jobId", component: JobApplicantsComponent },
      { path: "application-details/:userId", component: ApplicationDetailsComponent },
      { path: "**", component: NotFoundComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
