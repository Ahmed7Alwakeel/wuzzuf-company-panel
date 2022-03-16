import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Company } from 'src/app/interfaces/company';
import { Industry } from 'src/app/interfaces/industry';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { IndustryService } from 'src/app/services/industry/industry.service';
import { JobService } from 'src/app/services/jobs/job.service';
import { LoaderService } from 'src/app/services/loader/loader.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  company!: Company
  userId: string = ""
  @ViewChild('logo') logo!: ElementRef

  industries: Industry[] = []
  companyCountries = [
    { value: 'Egypt' },
    { value: 'Saudi Arabia ' },
    { value: 'United Arab Emirates' },
    { value: 'Sudan' },
    { value: 'Other' },
  ];
  size = [
    { value: '11-50' },
    { value: '51-100' },
    { value: '101-500' },
    { value: '501-1000' },
    { value: 'more than 1000' },
  ];
  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private industryService: IndustryService,
    private route: Router,
    private snakBar: MatSnackBar,
    private title: Title,
    public loaderServ: LoaderService,
    private jobService:JobService
  ) { }

  ngOnInit(): void {
    this.title.setTitle("WUZZUF | Edit-Profile")
    this.industryService.getIndustires().subscribe((industries: Industry[]) => {
      this.industries = industries
      console.log(this.loaderServ.isLoading);
    })
    this.authService.user.subscribe(user => {
      if (user) {
        this.authService.userID = user.uid
        this.userId = this.authService.userID
        this.jobService.getJobs().subscribe((job: any) => {
          this.jobService.jobs = job.map((ele: any) => {
            return {
              id: ele.payload.doc.id,
              ...ele.payload.doc.data()
            }
          })
        })
        this.companyService.getComapnyByID().subscribe((company: any) => {
          this.company = company
          this.loaderServ.isLoading = false
        })
      }

    })
  }

  
  updateDate(form: NgForm) {
    let logo: File = (<HTMLInputElement>this.logo.nativeElement).files![0]
    // alert( this.userId)
    let formValue = form.value
    let newData: Company = {
      aboutCompany: formValue.aboutCompany,
      companyEmail: this.company.companyEmail,
      companyIndustry: formValue.companyIndustry,
      companyName: formValue.companyName,
      companySize: formValue.companySize,
      companyCountry: formValue.companyCountry,
     
    }
    this.companyService.updatCompany(newData, this.userId,logo).then(() => {
      for(let i of this.jobService.jobs){
        if(i.companyID==this.userId){
          if(i.id!=null)
          this.jobService.updatJob(i.id,{...i,...this.company})
        }
      }
      form.reset()
      this.snakBar.open("Updated Data successfuly", 'Delete', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['green-snackbar']
      });
      this.route.navigate(['/dashboard'])
    })
  }
}
