import { Injectable } from '@angular/core';
import{ 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postsCollection: AngularFirestoreCollection<Post>;
  postDoc: AngularFirestoreDocument<Post>;

  constructor( private afs: AngularFirestore) { 
    this.postsCollection = this.afs.collection("post", ref =>
    ref.orderBy("claps", "desc").limit(10));
  }

  getPosts(): Observable<Post[]> {
    // use pipe operator before mapping actions
     return this.postsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  getPostData(id:string){
    this.postDoc = this.afs.doc<Post>(`post/${id}`);
    return this.postDoc.valueChanges();
  }

  create(data:Post){
    return this.postsCollection.add(data);
  }  
}
