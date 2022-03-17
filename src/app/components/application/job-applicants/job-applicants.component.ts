import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from 'src/app/interfaces/application';
import { Job } from 'src/app/interfaces/job';
import { User } from 'src/app/interfaces/user';
import { ApplicationService } from 'src/app/services/application/application.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JobService } from 'src/app/services/jobs/job.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-job-applicants',
  templateUrl: './job-applicants.component.html',
  styleUrls: ['./job-applicants.component.scss']
})

export class JobApplicantsComponent implements OnInit {

  jobID!: string | null
  joApplications: Application[] = []
  selectedJob: Job = {} as Job
  users: User[] = []

  constructor(
    private _applicatinServ: ApplicationService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private _userServ: UsersService,
    public loaderServ: LoaderService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (user) {
        this.authService.userID = user.uid
        this.activatedRoute.paramMap.subscribe((paramMap) => {
          this.jobID = paramMap.get('jobId');
          if (this.jobID != null)
            this._applicatinServ.getJobApplication(this.jobID).subscribe((applications: Application[]) => {
              // console.log(applications);
              this.loaderServ.isLoading = false
              this.joApplications = applications
              this.getUserDetails()
              console.log(applications);  
    
            })
        });




      }
      else {
        this.authService.userID = ""
      }
    })
  }

  //get single user details and display it into card
  getUserDetails() {
    this.joApplications.map((application: Application) => {
      this._userServ.getUserDetails(application.userId).subscribe((data) => {
        this.users.push(data)
      })
      console.log(this.users);

    })
  }

}


