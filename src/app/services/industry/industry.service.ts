import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Industry } from 'src/app/interfaces/industry';


@Injectable({
  providedIn: 'root'
})
export class IndustryService {

  constructor(private afs: AngularFirestore) {

  }

  getIndustires(): Observable<Industry[]> {
    return this.afs.collection<Industry>('companyIndustry').valueChanges()
  }
}
