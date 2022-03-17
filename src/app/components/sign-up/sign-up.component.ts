import { Component, DoCheck, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';;
import { CompanySize } from 'src/app/interfaces/company-size';
import { Industry } from 'src/app/interfaces/industry';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Company } from 'src/app/interfaces/company';
import { CompanyEmployee } from 'src/app/interfaces/company-employee';
import { CompanyService } from 'src/app/services/company/company.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IndustryService } from 'src/app/services/industry/industry.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})


export class SignUpComponent implements OnInit {
  @ViewChild('logo') logo!: ElementRef
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  // currentUpload!: Upload

  industries: Industry[] = []
  sizes: CompanySize[] = [
    { value: '11-50' },
    { value: '51-100' },
    { value: '101-500' },
    { value: '501-1000' },
    { value: 'more than 1000' },
  ];
  companyCountry = [
    { value: 'Egypt' },
    { value: 'Saudi Arabia ' },
    { value: 'United Arab Emirates' },
    { value: 'Sudan' },
    { value: 'Other' },
  ];

  errorMsg: string = ''

  @ViewChild('stepper') allForms!: any;

  constructor(private _formBuilder: FormBuilder
    , private _industryServ: IndustryService
    , private _authServ: AuthService
    , private _companyServ: CompanyService
    , private router: Router,
    private _snackBar: MatSnackBar) { }
  
  


  ngOnInit() {
    this._industryServ.getIndustires().subscribe((industries: Industry[]) => {
      this.industries = industries
    })

    this.firstFormGroup = this._formBuilder.group({
      empFirstName: ['', Validators.required],
      empLastName: ['', Validators.required],
      password: ['', Validators.required],
      mobileNo: ['', Validators.required],
      empTitle: ['', Validators.required],
      companyName: ['', Validators.required],
      companySize: ['', Validators.required],
      companyEmail: ['', Validators.required],
      companyCountry: ['', Validators.required],
      companyIndustry: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      companySize: ['', Validators.required],
      aboutCompany: ['', Validators.required],
      logo: ['', Validators.required],

    });

    console.log({ ...this.firstFormGroup.value, ...this.secondFormGroup.value });
  }

  signUp() {

    let logo: File = (<HTMLInputElement>this.logo.nativeElement).files![0]
    let formData = { ...this.firstFormGroup.value, ...this.secondFormGroup.value };
    const companyModel: Company = {
      companyName: formData.companyName,
      companyEmail: formData.companyEmail,
      companySize: formData.companySize,
      companyIndustry: formData.companyIndustry,
      aboutCompany: formData.aboutCompany,
      companyCountry: formData.companyCountry,

    }

    const empModel: CompanyEmployee = {
      empFirstName: formData.empFirstName,
      empLastName: formData.empLastName,
      empTitle: formData.empTitle,
      mobileNo: formData.mobileNo,
    }

    this._authServ.signUp(formData.companyEmail, formData.password).then((response: any) => {
      this._companyServ.addNewCompany(response.user.uid,companyModel, logo, empModel)


    })
  }
}
