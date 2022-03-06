import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private fireStore: AngularFirestore) { }

  getUserDetails(userId: string) {
    return this.fireStore.doc(`users/${userId}`)
      .snapshotChanges()
      .pipe(
        map((action: any) => {
          // console.log(action.payload);
          if (action.payload.exists === false) {
            return new Object as User;
          } else {
            const data = action.payload.data() as User;
            data.userId = action.payload.id;
            return data;
          }
        })
      );
  }
}
