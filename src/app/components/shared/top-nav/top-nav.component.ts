import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})

export class TopNavComponent implements OnInit {

  // output to sidebar component
  @Output() toggleSide: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngOnInit(): void { }

  //emit toggleSideBar to parent(sidenav)
  toggleSideBar() {
    this.toggleSide.emit()
  }

}
