import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HandlingJobsComponent } from './components/handling-jobs/handling-jobs.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginGuard } from './guards/login/login.guard';


const routes: Routes = [
  {path:"login", component:LoginComponent}, // ,canActivate:[LoginGuard]
  {path:"add-jobs", component:HandlingJobsComponent},
  {path:"edit-jobs/:id", component:HandlingJobsComponent},
  {path:"sign-up", component:SignUpComponent},// ,canActivate:[LoginGuard]
  {path:"welcome", component:WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
