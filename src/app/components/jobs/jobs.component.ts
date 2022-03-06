import { Component, Injectable, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/interfaces/job';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JobService } from 'src/app/services/jobs/job.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobTitle!: string
  isUser = false;
  isLoading = false;
  jobs: Job[] = []
  editMode = false;
  status!: string | null

  constructor(public jobService: JobService,
    private authService: AuthService,
    private snakBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    public loaderSer: LoaderService
  ) { }

  ngOnInit(): void {
    this.title.setTitle("WUZZUF | Jobs")
    this.authService.user.subscribe(user => {
      if (user) {
        // console.log(user.uid)
        this.isUser = true;
        this.authService.userID = user.uid

        //get query string
        this.route.queryParamMap.subscribe((params) => {
          this.status = params.get('status')
        })

        this.jobService.getJobs().subscribe((job: any) => {
          this.jobs = job.map((ele: any) => {
            console.log(ele.payload.doc.data());
            this.loaderSer.isLoading = false
            return {
              id: ele.payload.doc.id,
              ...ele.payload.doc.data()
            }
          })


          //CHECK IF THE status is null then render the job with its status
          if (this.status != null) {
            this.jobs = this.jobs.filter((job) => job.status.toLowerCase() == this.status)
            console.log(this.jobs);
          }
        })
      }

      else {
        this.isUser = false
        this.authService.userID = ""
      }
    })
  }


  deleteJob(job: Job) {
    if (job.id != null)
      this.jobService.deleteJob(job.id).then(() => {
        this.snakBar.open("Job Deleted successfuly", 'Delete', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }).then(() => {
        this.router.navigate(['/jobs'])
      })
  }

}


