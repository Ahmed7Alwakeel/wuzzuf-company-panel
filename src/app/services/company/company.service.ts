import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private firestore: AngularFirestore) { }


  async addNewCompany(id: string, companyModel: any, empModel: any) {
    return this.firestore.doc(`company/${id}`).set(companyModel).then(() => {
      this.firestore.collection(`company/${id}/employees`).add(empModel)
      
    }).catch(err=>console.log(err))
  }
}
