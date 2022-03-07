import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Company } from 'src/app/interfaces/company';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private firestore: AngularFirestore,
    private authService: AuthService,
    private storage: AngularFireStorage) { }
  getComapnyByID() {
    return this.firestore.doc(`company/${this.authService.userID}`).valueChanges()

  }
  updatCompany(company: Company, userID: string) {
    return this.firestore.doc(`company/${userID}`).update(company)
  }
  addNewCompany(id: string, companyModel: Company, image: File, empModel: any) {
    let ref = this.storage.ref('company/' + image.name)
    ref.put(image).then(() => {
      ref.getDownloadURL().subscribe(imagUrl => {
        this.firestore.collection(`company`).add({ ...companyModel, imagUrl }).then(() => {
          this.firestore.collection(`company/${id}/employees`).add(empModel)

        }).catch(err => console.log(err))
      })
    })
  }

}