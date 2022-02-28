import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HandlingJobsComponent } from './components/handling-jobs/handling-jobs.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"sign-up", component:SignUpComponent,canActivate:[LoginGuard]},
  {path:"welcome", component:WelcomeComponent},
  {path:"handling-jobs", component:HandlingJobsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
