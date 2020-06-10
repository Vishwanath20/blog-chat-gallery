import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable} from 'rxjs';

import { Thread} from './thread.model';
import { Message } from './message.model';
import { AuthService} from '../core/auth.service';
import { MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  threadCollection: AngularFirestoreCollection<Thread>;
  threadDoc: AngularFirestoreDocument<Thread>;

  message:Observable<Message>;

  constructor(
    private messageService: MessageService,
    private auth: AuthService,
    private afs: AngularFirestore
  ) { }

  getThreads(){
    this.threadCollection = this.afs.collection('chats');
    return this.threadCollection.valueChanges();
  }

  getThread(profileId:string){
    this.threadDoc = this.afs.doc<Thread>(`chats/${profileId}`);
    return this.threadDoc.valueChanges();
  }

  createThread(profileId){
    const currentUserId = this.auth.currentUserId;

    const id = profileId < currentUserId ? ` ${profileId}_${currentUserId}`: `${currentUserId}_${profileId}`
    const avatar = this.auth.authState.photoURL;
    const members = { [profileId]: true, [currentUserId]: true};

    const thread: Thread = {id, avatar, members};
    const threadPath = `chat/${id}`;

    return this.afs.doc(threadPath).set(thread, {merge: true});

  }
}
