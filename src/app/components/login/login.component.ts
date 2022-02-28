import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
error:string=""
isLogin=false;
  constructor(private authService:AuthService,
    private route:Router,
    private title:Title
    ) { }

  ngOnInit(): void {
    this.title.setTitle("WUZZUF | Login")
  }
  logIn(form:NgForm){
    let data=form.value;
    this.authService.logIn(data.email,data.password).then(()=>{
      this.route.navigate(['/welcome'])
      this.isLogin=true;
    }).catch(error=>{
     
      this.error=error.message
    })
  }

}
