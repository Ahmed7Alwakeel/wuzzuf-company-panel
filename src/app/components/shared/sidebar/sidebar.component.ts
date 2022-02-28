import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit  {

  opened: boolean = false;
  
  constructor() { }

  ngOnInit(): void { }

  toggleNav() {
    this.opened = !this.opened
  }
  
}
