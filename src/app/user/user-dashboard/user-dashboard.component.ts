import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Md5 } from 'ts-md5'
import { finalize } from 'rxjs/operators';

import { User } from '../user.model';
import { AuthService } from 'src/app/core/auth.service';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  editing=false;
  user:User;

task: AngularFireUploadTask;

  path: string;
  meta: object;
  uploadType: boolean;

  constructor( private auth: AuthService,
    private userService: UserService,
    private storage: AngularFireStorage,
    private location: Location
    ) { }

  ngOnInit() {
    this.getUser();
    this.setUploadData();
  }

  setUploadData() {

    const uid = this.auth.currentUserId;
    return this.auth.user.subscribe(user => {
      // wrap this in a if statement
      // to avoid error msg on logout
      if (user) {
        this.path = `users/${user.uid}/gallery`;
        this.meta = { uploader: user.uid, website: 'https://foli.sk' };
        // true means Collection upload
        // false means document field upload
        this.uploadType = true;

      }
    });
  }

  getUser(){
    return this.auth.user.subscribe(user => {
      this.user = user;
      console.log("### Inside the user-dashboard--user is:::"+this.user);
    } );
   
  }

  updateProfile(){
    return this.userService.updateProfileData(
      this.user.displayName,
      this.user.photoURL
    )
  }

  updateEmail(){
    return this.userService.updateEmailData(this.user.email )
  }

  async  uploadPhotoURL(event) {
    const file = event.target.files[0];

    const fileName = Md5.hashStr(file.name + new Date().getTime());
    console.log("### Inside the user-dashboard--fileName::"+fileName);

    const path = `users/${this.user.uid}/photos/${fileName}`;
    const ref = this.storage.ref(path);
   // console.log("file name is::"+file.name)
    if (file.type.split('/')[0] !== 'image') {
      return alert('only images allowed');
    } 
    else {
     this.task = this.storage.upload(path, file);

     // add this ref
     const ref = this.storage.ref(path);
     console.log("Inside the user-dashboard-- ref is::"+ref);
     console.log("Inside the user-dashboard-- ref.getDownloadURL() is::"+ref.getDownloadURL());

     // and change the observable here
     ref.getDownloadURL().subscribe(url => {
       console.log("User profile image url is:: "+url);
       this.userService.updateProfileData(this.user.displayName, url);
     });
   }
  }

  updateUser() {
    console.log("### Inside the updateUser() ###");
    const data = {
      website: this.user.website || null,
      location: this.user.location || null,
      bio: this.user.bio || null
    };
    return this.userService.updateUserData(data);
  }

  goBack(){
    this.location.back();
  }
}
