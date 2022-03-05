import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit  {

  opened: boolean = false;
  
  constructor(
    private authService:AuthService,
    private route:Router
  ) { 

  }

  ngOnInit(): void { }

  toggleNav() {
    this.opened = !this.opened
  }
  logOut(){
    this.authService.logOut().then(()=>{
this.route.navigate(['/login'])
    })
  }
  
}