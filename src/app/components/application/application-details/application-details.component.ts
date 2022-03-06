import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
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

  constructor(
    private _userServ: UsersService,
    private _route: ActivatedRoute,
    private _router: Router,
    public loaderServ: LoaderService

  ) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get("userId")

      if (this.userId != null) {
        this._userServ.getUserDetails(this.userId).subscribe((user) => {
          console.log(user);
          this.user = user;
          this.loaderServ.isLoading = false
        })

      } else {
        this._router.navigate(['/notfound'], {
          queryParamsHandling: "merge"
        });
      }
    })
  }

} 
