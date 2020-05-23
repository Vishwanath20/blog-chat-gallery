import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

import { User } from '../user.model';
import { AuthService } from 'src/app/core/auth.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  editing=false;
  user:User;

  task: AngularFireUploadTask;

  constructor( private auth: AuthService,
    private userService: UserService,
    private storage: AngularFireStorage,
    private location: Location
    ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    return this.auth.user.subscribe(user => this.user = user);
    console.log("user is:::"+this.user);
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

  uploadPhotoURL(event):void {
    const file = event.target.files[0];
    const path = `users/${this.user.uid}/photos/${file.name}`;
    console.log("file name is::"+file.name)
    if (file.type.split('/')[0] !== 'image') {
      return alert('only images allowed');
    } else {
      this.task = this.storage.upload(path, file);

      // add this ref
      const ref = this.storage.ref(path);

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
