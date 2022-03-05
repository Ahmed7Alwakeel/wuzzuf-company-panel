import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from 'src/app/interfaces/application';
import { Job } from 'src/app/interfaces/job';
import { ApplicationService } from 'src/app/services/application/application.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JobService } from 'src/app/services/jobs/job.service';

@Component({
  selector: 'app-job-applicants',
  templateUrl: './job-applicants.component.html',
  styleUrls: ['./job-applicants.component.scss']
})

export class JobApplicantsComponent implements OnInit {

  jobID!: string | null
  joApplications: Application[] = []
  selectedJob: Job = {} as Job

  constructor(
    private _applicatinServ: ApplicationService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (user) {
        this.authService.userID = user.uid
        this.activatedRoute.paramMap.subscribe((paramMap) => {
          this.jobID = paramMap.get('jobId');
          if (this.jobID != null)
            this._applicatinServ.getJobApplication(this.jobID).subscribe((applications: Application[]) => {
              console.log(applications);
              this.joApplications = applications
            })
        });
      }
      else {
        this.authService.userID = ""
      }
    })
  }

}


