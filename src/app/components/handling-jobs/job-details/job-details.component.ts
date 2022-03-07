import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from 'src/app/interfaces/application';
import { Job } from 'src/app/interfaces/job';
import { ApplicationService } from 'src/app/services/application/application.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JobService } from 'src/app/services/jobs/job.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  jobID!: string | null
  selectedJob: Job = {} as Job
  joApplications!:Application[]
  constructor(
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    public loaderServ: LoaderService,
   private _applicatinServ:ApplicationService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (user) {
        this.authService.userID = user.uid
        this.activatedRoute.paramMap.subscribe((paramMap) => {
          this.jobID = paramMap.get('id');
          if (this.jobID != null){
            this.jobService.getJobByID(this.jobID).subscribe((job: any) => {
              this.selectedJob = job
              this.loaderServ.isLoading = false
            })
            
            this._applicatinServ.getJobApplication(this.jobID).subscribe((applications: Application[]) => {
              // console.log(applications);
              this.loaderServ.isLoading = false
              this.joApplications = applications
              
            })
          }
           
        });
      }
      else {
        this.authService.userID = ""
      }
    })
  }

}
