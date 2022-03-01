import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Job } from 'src/app/interfaces/job';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JobService } from 'src/app/services/jobs/job.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  isUser = false;
  isLoading = false;
  jobs: Job[] = []
  editMode=false;
  constructor(private jobService: JobService,
    private authService: AuthService,
    private snakBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoading = true
    this.authService.user.subscribe(user => {
      if (user) {
        console.log(user.uid)
        this.isUser = true;
        this.authService.userID = user.uid
        this.jobService.getJobs().subscribe((job: any) => {
          this.isLoading = false
          this.jobs = job.map((ele: any) => {
            return {
              id: ele.payload.doc.id,
              ...ele.payload.doc.data()
            }
          })
        })

      }
      else {
        this.isUser = false
        this.authService.userID = ""
      }
    })
    
  
  }


  deleteJob(job:Job){
    if(job.id!=null)
    this.jobService.deleteJob(job.id)

  }
}


