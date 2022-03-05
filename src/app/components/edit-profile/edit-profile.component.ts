import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Company } from 'src/app/interfaces/company';
import { Industry } from 'src/app/interfaces/industry';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { IndustryService } from 'src/app/services/industry.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  company!: Company
  userId:string=""

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
    private title:Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle("WUZZUF | Edit-Profile")
    this.industryService.getIndustires().subscribe((industries: Industry[]) => {
      this.industries = industries
    })
    this.authService.user.subscribe(user => {
      if (user) {
        this.authService.userID = user.uid
        this.userId=this.authService.userID
        this.companyService.getComapnyByID().subscribe((company: any) => {
          this.company = company
        })
      }
    })

  }
  updateDate(form: NgForm) {
    // alert( this.userId)
    let formValue = form.value
    let newData: Company = {
      aboutCompany: formValue.aboutCompany,
      companyEmail: this.company.companyEmail,
      companyIndustry: formValue.companyIndustry,
      companyName: formValue.companyName,
      companySize: formValue.companySize,
      logo: "",
      companyCountry: formValue.companyCountry
    }
    this.companyService.updatCompany(newData,this.userId).then(() => {
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
