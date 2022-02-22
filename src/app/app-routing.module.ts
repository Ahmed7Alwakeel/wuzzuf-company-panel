import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"login", component:LoginComponent,canActivate:[LoginGuard]},
  {path:"sign-up", component:SignUpComponent,canActivate:[LoginGuard]},
  {path:"welcome", component:WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
