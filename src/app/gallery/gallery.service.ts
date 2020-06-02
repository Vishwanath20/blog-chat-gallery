import { Injectable } from '@angular/core';
import { 
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { AuthService } from '../core/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  galleryCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private auth: AuthService) { }

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
}
