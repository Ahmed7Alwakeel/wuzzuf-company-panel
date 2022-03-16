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
  updatCompany(company: Company, userID: string, image?: File) {
    return new Promise((resolve, reject) => {
      if (image) {
        let ref = this.storage.ref('company/' + image?.name)
        ref.put(image).then(() => {
          ref.getDownloadURL().subscribe(logo => {
            this.firestore.doc(`company/${userID}`).update({ ...company, logo }).then(() => {
              resolve(console.log("add"))
            }).catch(err => console.log(err))
          })
        })
      } else {
        this.firestore.doc(`company/${userID}`).update({ ...company }).then(() => {

          resolve(console.log("add"))

        }).catch(err => console.log(err))
      }
    })
  }

  addNewCompany(id: string, companyModel: Company, image: File, empModel: any) {
    return new Promise((resolve, reject) => {
      let ref = this.storage.ref('company/' + image.name)
      ref.put(image).then(() => {
        ref.getDownloadURL().subscribe(logo => {
          this.firestore.doc(`company/${id}`).set({ ...companyModel, logo }).then(() => {
            this.firestore.collection(`company/${id}/employees`).add(empModel).then(() => {
              resolve(console.log("add"))
            })

          }).catch(err => console.log(err))
        })
      })
    })
  }

}
