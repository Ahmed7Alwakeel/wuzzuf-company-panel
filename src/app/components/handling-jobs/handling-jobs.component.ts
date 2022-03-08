import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/interfaces/company';
import { Job } from 'src/app/interfaces/job';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { JobService } from 'src/app/services/jobs/job.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-handling-jobs',
  templateUrl: './handling-jobs.component.html',
  styleUrls: ['./handling-jobs.component.scss']
})
export class HandlingJobsComponent implements OnInit {
  editMode = false;
  isUser = false;
  company!:Company
  jobID!: string | null
  editingJob: Job = {} as Job

  editorStyle = { height: '250px' }
  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['clean'],
    ]
  }

  constructor(private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private snakBar: MatSnackBar,
    private router: Router,
    private title: Title,
    private loaderService:LoaderService,
    private companyService:CompanyService) { }

  ngOnInit(): void {

this.loaderService.isLoading=false;

    this.authService.user.subscribe(user => {
      if (user) {

        console.log(user.uid)
        this.isUser = true;
        this.authService.userID = user.uid
        this.companyService.getComapnyByID().subscribe((company:any)=>{
          this.company=company
        })
        this.activatedRoute.paramMap.subscribe((paramMap) => {
          this.jobID = paramMap.get('id');
          this.editMode = paramMap.get('id') != null;
          if (this.jobID != null) {
            this.jobService.getJobByID(this.jobID).subscribe((job: any) => {
              this.editingJob = job
              console.log(this.editingJob.careerLevel)
              this.title.setTitle("WUZZUF | Editing-Job")

            })
          } else {
            this.title.setTitle("WUZZUF | Add-Jobs")
          }

        });
      }
      else {
        this.isUser = false
        this.authService.userID = ""
      }
    })

  }

  addJob(form: NgForm) {
    let formValue = form.value
    let data: Job = {
      date: new Date(),
      jobTitle: formValue.jobTitle,
      jobType: formValue.jobType,
      careerLevel: formValue.careerLevel,
      experience: `${formValue.from} To ${formValue.to} years`,
      salary: formValue.salary,
      jobCategories: formValue.jobCategories,
      jobDescription: formValue.jobDescription,
      jobRequirements: formValue.jobRequirements,
      status: "PENDING",
      educationLevel: formValue.educationLevel,
      companyID: this.authService.userID,
      jobTitleAR:formValue.jobTitleAR,
      jobTypeAR:formValue.jobTypeAR,
      careerLevelAR:formValue.careerLevelAR,
      experienceAR:` ${formValue.toAR} الي ${formValue.fromAR} من`,
      salaryAR:formValue.salaryAR,
      jobCategoriesAR:formValue.jobCategoriesAR,
      jobDescriptionAR:formValue.jobDescriptionAR,
      jobRequirementsAR:formValue.jobRequirementsAR,
      educationLevelAR:formValue.educationLevelAR
  
    }

    this.jobService.addJob({...data,...this.company}).then(() => {
      form.reset()
      this.snakBar.open("Added Job successfuly", 'Delete', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      setTimeout(() => {
        this.router.navigate(['/jobs']);
      }, 1500)
    }
    )

  }

  update(form: NgForm) {

    let newJob = {
      date: new Date(),
      jobTitle: this.editingJob.jobTitle,
      jobType: this.editingJob.jobType,
      careerLevel: this.editingJob.careerLevel,
      experience: `${form.value.from} To ${form.value.to} years`,
      salary: this.editingJob.salary,
      jobCategories: this.editingJob.jobCategories,
      jobDescription: this.editingJob.jobDescription,
      jobRequirements: this.editingJob.jobRequirements,
      educationLevel: this.editingJob.educationLevel,
      status: "PENDING"
    }

    if (this.jobID != null)
      this.jobService.updatJob(this.jobID, {...newJob,...this.company}).then(() => {
        form.reset()
        this.snakBar.open("Editing Job successfuly", 'Delete', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',

        });
        setTimeout(() => {
          this.router.navigate(['/jobs']);
        }, 1500)
      }
      )
  }

}
