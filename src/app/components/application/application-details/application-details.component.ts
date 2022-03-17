import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'src/app/interfaces/application';
import { User } from 'src/app/interfaces/user';
import { ApplicationService } from 'src/app/services/application/application.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {

  userId!: string | null;
  user!: User
  appId: any = "";
  application!: Application

  constructor(
    private _userServ: UsersService,
    private _route: ActivatedRoute,
    private _router: Router,
    public loaderServ: LoaderService,
    private _applicationServ: ApplicationService

  ) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get("userId")

      if (this.userId != null) {
        this._userServ.getUserDetails(this.userId).subscribe((user) => {
          // console.log(user);
          this.user = user;
          this.loaderServ.isLoading = false
        })

      } else {
        this._router.navigate(['/notfound'], {
          queryParamsHandling: "merge"
        });
      }
    })

    this._route.queryParamMap.subscribe((paramMaps) => {
      this.appId = paramMaps.get("appId")
      // console.log(this.appId);
    })

    //get user questions

    this._applicationServ.getApplicationDetails(this.appId).subscribe((data) => {
      this.application = data
      console.log(this.application);
    })
  }

} 
