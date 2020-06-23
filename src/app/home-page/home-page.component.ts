import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Post } from '../post/post.model'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  postsCollection: AngularFirestoreCollection<Post>;
  items: Observable<any[]>;


  constructor(private afs: AngularFirestore) {
    this.postsCollection = this.afs.collection('posts', ref =>
        ref.orderBy('trending', 'desc').limit(5));
    this.items = this.postsCollection.valueChanges();
    
  }
  ngOnInit() {
  
  }

}

// ===========
// constructor(private afs: AngularFirestore) {
//   this.postsCollection = this.afs.collection('posts', ref =>
//     ref.orderBy('trending', 'desc').limit(10)
//   );
// }