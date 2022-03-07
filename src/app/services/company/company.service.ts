import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Company } from 'src/app/interfaces/company';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private firestore: AngularFirestore,
    private authService: AuthService) { }
  getComapnyByID() {
    return this.firestore.doc(`company/${this.authService.userID}`).valueChanges()

  }
  updatCompany(company: Company,userID:string) {
    return this.firestore.doc(`company/${userID}`).update(company)
  }
  
  async addNewCompany(id: string, companyModel: any, empModel: any) {
    return this.firestore.doc(`company/${id}`).set(companyModel).then(() => {
      this.firestore.collection(`company/${id}/employees`).add(empModel)

    }).catch(err => console.log(err))
  }
}
