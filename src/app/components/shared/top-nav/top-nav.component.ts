import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Company } from 'src/app/interfaces/company';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { JobService } from 'src/app/services/jobs/job.service';
import { JobsComponent } from '../../jobs/jobs.component';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})

export class TopNavComponent implements OnInit {
  jobTitle!: any
 
  // output to sidebar component
  @Output() toggleSide: EventEmitter<string> = new EventEmitter()

  constructor(private jobService: JobService,
    private authService: AuthService,
   ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (user) {
        this.authService.userID = user.uid
       
        this.jobService.getJobs().subscribe((job: any) => {
          this.jobService.jobs = job.map((ele: any) => {
            return {
              id: ele.payload.doc.id,
              ...ele.payload.doc.data()
            }
          })
        })

      }
      else {
        this.authService.userID = ""
      }
    })



  }
  search() {
    if (this.jobTitle == "") {
      this.ngOnInit()
    } else {
      this.jobService.jobs = this.jobService.jobs.filter(job => {
        return job.jobTitle.toLocaleLowerCase().match(this.jobTitle.toLocaleLowerCase())
      })
    }
  }
  //emit toggleSideBar to parent(sidenav)
  toggleSideBar() {
    this.toggleSide.emit()
  }

}
