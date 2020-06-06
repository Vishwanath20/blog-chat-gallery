import { Injectable } from '@angular/core';
import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { AuthService } from '../core/auth.service';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  galleryCollection: AngularFirestoreCollection<any>;
  galleryDoc: AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore, private auth: AuthService, private storage:AngularFireStorage) { }

  getImages(){
    console.log("Gallery service called--getImage()");
    const uid = this.auth.currentUserId;
    console.log("Inside the Gallery service-- uid is::"+uid);
    this.galleryCollection = this.afs.collection(`users/${uid}/gallery`);
    return this.galleryCollection.snapshotChanges().pipe(map(action => {
      return action.map( a => {
        console.log("Inside Gallery service-- data is::"+a);
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        console.log("Inside the Gallery service-- data is::"+data);
        console.log("Inside the Gallery service-- id is::"+id);
        return {id, ...data};
      }

      )
    }
      
    ));
  }

  getImage(id: string){
    const uid = this.auth.currentUserId;
    this.galleryDoc = this.afs.doc(`users/${uid}/gallery/${id}`);
    return this.galleryDoc.valueChanges();

  }

  deleteImage(id:string, name:string){
    console.log("Inside the Gallery service--deleteImage::");
    const uid = this.auth.currentUserId;
    const imageRef = this.storage.ref(`users/${uid}/gallery`).child(name).delete();
    console.log("Image deleted from storage!!!");
    this.afs.doc(`users/${uid}/gallery/${id}`).delete();
    console.log("Image is deleted from database!!");
    console.log("All done here!!");
  }
}
