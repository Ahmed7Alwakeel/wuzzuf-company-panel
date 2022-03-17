import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Company } from 'src/app/interfaces/company';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { JobService } from 'src/app/services/jobs/job.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { JobsComponent } from '../../jobs/jobs.component';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})

export class TopNavComponent implements OnInit {
  searchInput!: any
  company: Company={} as Company
  


  // output to sidebar component
  @Output() toggleSide: EventEmitter<string> = new EventEmitter()

  constructor(private jobService: JobService,
    private authService: AuthService,
    private companyService: CompanyService,
    private route: Router,
    public  loaderServ: LoaderService,
    private dialog:MatDialog
  ) { }


  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (user) {
        this.authService.userID = user.uid
        console.log(this.authService.userID)

        this.jobService.getJobs().subscribe((job: any) => {
          this.jobService.jobs = job.map((ele: any) => {
            return {
              id: ele.payload.doc.id,
              ...ele.payload.doc.data()
            }
          })
        })

        this.getCompany()
      }
      else {
        this.authService.userID = ""
      }
    })

  }

  search() {
    if (this.searchInput == "") {
      this.ngOnInit()
    } else {
      this.jobService.jobs = this.jobService.jobs.filter(job => {
        return job.jobTitle.toLocaleLowerCase().match(this.searchInput.toLocaleLowerCase())||
        job.status.toLocaleLowerCase().match(this.searchInput.toLocaleLowerCase())||
        job.jobCategories.toLocaleLowerCase().match(this.searchInput.toLocaleLowerCase())||
        job.salary.toLocaleLowerCase().match(this.searchInput.toLocaleLowerCase())||
        job.jobType.toLocaleLowerCase().match(this.searchInput.toLocaleLowerCase())
        

      })
      
    }
  }

  //emit toggleSideBar to parent(sidenav)
  toggleSideBar() {
    this.toggleSide.emit()
  }

  getCompany() {
    this.companyService.getComapnyByID().subscribe((company: any) => {
      console.log(company)
      this.company = company
    })
    console.log(this.company)
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
