import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { JobsComponent } from '../../jobs/jobs.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  opened: boolean = false;
  popoverTitle = 'Popover title';
  popoverMessage = 'Popover description';
  confirmClicked = false;
  cancelClicked = false;

  constructor(
    private authService: AuthService,
    private route: Router,
    public loaderServ: LoaderService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void { }

  toggleNav() {
    this.opened = !this.opened
  }

  logOut() {
    this.dialog.open(DialogComponent, {

      height: '200px',
      width: '250px',
      disableClose: true

    }).afterClosed().subscribe((msg) => {
      if (msg == true) {
        this.authService.logOut().then(() => {
          this.route.navigate(['/login'])
        })

      }

    })

  }

}
