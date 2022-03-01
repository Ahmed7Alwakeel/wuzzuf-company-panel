import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Job } from 'src/app/interfaces/job';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private fireStore: AngularFirestore,
    private authService: AuthService) { }
  addJob(job:Job) {
    return this.fireStore.collection(`company/${this.authService.userID}/jobs`).add(job)
  }
  getJobs(){
    return this.fireStore.collection(`company/${this.authService.userID}/jobs`).snapshotChanges()
  }
  deleteJob(jobID:string){
    return this.fireStore.doc(`company/${this.authService.userID}/jobs/${jobID}`).delete()
  }
  getJobByID(jobID:string){
    return this.fireStore.doc(`company/${this.authService.userID}/jobs/${jobID}`).valueChanges()

  }
  updatJob(jobID: string, job:Job) {
    return this.fireStore.doc(`company/${this.authService.userID}/jobs/${jobID}`).update(job)
  }
}
