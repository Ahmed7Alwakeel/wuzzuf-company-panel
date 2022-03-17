import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs';
import { Application } from '../../interfaces/application';

@Injectable({
  providedIn: 'root'
})

export class ApplicationService {

  constructor(private fireStore: AngularFirestore,) { }

  getJobApplication(jobId: string) {
    return this.fireStore.collection<Application>('jobApplication', ref => ref.where('jobId', '==', jobId))
      .snapshotChanges()
      .pipe(
        map((changes: any) => changes.map((c: any) => {
          return {
            applicationId: c.payload.doc.id,
            ...c.payload.doc.data()
          }
        }
        ))
      )
  }

  getApplicationDetails(applicationId: string) {
    return this.fireStore.doc(`jobApplication/${applicationId}`)
      .snapshotChanges()
      .pipe(
        map((action: any) => {
          // console.log(action.payload);
          if (action.payload.exists === false) {
            return new Object as Application;
          } else {
            const data = action.payload.data() as Application;
            data.userId = action.payload.id;
            return data;
          }
        })
      );
  }


}
