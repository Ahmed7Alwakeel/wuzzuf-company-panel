import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  error: string = ""
  isLogin = false;
  forgetMode=false
  constructor(private authService: AuthService,
    private route: Router,
    private title: Title,
    private activeRoute:ActivatedRoute,
    private snakBar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.title.setTitle("WUZZUF | Login")
  }
  logIn(form: NgForm) {
    let data = form.value;
    this.authService.logIn(data.email, data.password).then(() => {
      this.route.navigate([''])
      this.isLogin = true;
    }).catch((error: any) => {
      switch (error.code) {
        case "auth/wrong-password":
          this.error ="Password is invaid";
          break;

        case "auth/invalid-email":
          this.error ="Email is invaid";
          break;

        default:
          this.error ="Please valid your Email and Password";

        
      }
      
    })
  }
  resetPassword(form:NgForm){
  
    this.authService.sendEmailMsg(form.value.email).then(()=>{
  
      this.snakBar.open("Check Your Mail", 'Delete', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      this.forgetMode=false
      const url='https://mail.google.com/mail/u/0/#inbox/FMfcgzGmvLXdPrVdJkQbbKvJDdQFxwJF'
      setTimeout(()=>{
        window.open(url,'_blank')
      },1500)
      
   
    })
  }
}
