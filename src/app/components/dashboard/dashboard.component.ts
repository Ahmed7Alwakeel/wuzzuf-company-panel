import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Job } from 'src/app/interfaces/job';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JobService } from 'src/app/services/jobs/job.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  jobs: Job[] = []
  pendingJobs: Job[] = []
  acceptedJobs: Job[] = []
  refusedJobs: Job[] = []
  constructor(
    private jobService: JobService,
    private authService: AuthService,
    private title: Title

  ) { }

  ngOnInit(): void {
    this.title.setTitle("WUZZUF | Dashboard")
    this.authService.user.subscribe(user => {
      if (user) {
        this.authService.userID = user.uid
        this.jobService.getJobs().subscribe((job: any) => {
          this.jobs = job.map((ele: any) => {
            return {
              id: ele.payload.doc.id,
              ...ele.payload.doc.data()
            }
          })
          for (let i = 0; i < this.jobs.length; i++) {
            console.log(this.jobs[i].status)
            if (this.jobs[i].status === "PENDING") {
              this.pendingJobs.push(this.jobs[i])
            } else if (this.jobs[i].status == "ACCEPTED") {
              this.acceptedJobs.push(this.jobs[i])
            } else {
              this.refusedJobs.push(this.jobs[i])
            }
          }
        })

      }
      else {
        this.authService.userID = ""
      }
    })
  }

}
