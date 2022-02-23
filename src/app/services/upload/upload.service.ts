import { Injectable } from '@angular/core';
import { Upload } from './service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class UploadService {
  constructor(private storage: AngularFireStorage, private firestore: AngularFirestore) {

  }

  pushUpload(upload: Upload) {
    return new Promise<void>((resolve, reject) => {
      let ref = this.storage.ref(`company/${upload.file.name}`)
      ref.put(upload.file).then((snapshot) => {
        //upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

        ref.getDownloadURL().subscribe((fileUrl) => {
          upload.url = fileUrl
        })
      }).catch(err => console.log(err))
    })
  }

  private saveFileData(upload: Upload) {
    this.firestore.collection('company').add(upload)
  }
}
