import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/interfaces/job';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JobService } from 'src/app/services/jobs/job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  jobID!:string | null
  selectedJob:Job={} as Job
  constructor(
    private jobService:JobService,
    private activatedRoute: ActivatedRoute,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (user) {
        this.authService.userID = user.uid
        this.activatedRoute.paramMap.subscribe((paramMap) => {
          this.jobID = paramMap.get('id');
          if(this.jobID!=null)
          this.jobService.getJobByID(this.jobID).subscribe((job:any)=>{
            this.selectedJob=job
          })
        });
      }
      else {
        this.authService.userID = ""
      }
    })
  }

}
