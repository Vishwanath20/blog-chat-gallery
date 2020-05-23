import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';

import { PostService } from '../post.service';
import { Post } from '../post.model';
import { AuthService } from 'src/app/core/auth.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {

  postForm: FormGroup;
  imageURL: string;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private postService: PostService,
    private auth: AuthService,
    private fb: FormBuilder,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.postForm = this.fb.group ({
      title: [''],
      content: [''],
      draft: false
    })
  }

  savePost(data: Post){
    console.log("### Inside the savePost ###");
    const formData: Post = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      title: this.postForm.get('title').value,
      image: this.imageURL || null,
      content: this.postForm.get('content').value,
      draft: this.postForm.get('draft').value,
      published: new Date(),
      claps: 0
    }

    if(!this.postForm.untouched){
      console.log("Published is::"+formData.published);
      this,this.postService.create(formData);
      this.postForm.reset();
      this.imageURL='';
    }
   
  }

  uploadPostImage(event): void{
    console.log("### UploadPostImage ###");
    const file = event.target.files[0];
    const path = `post/${file.name}`;

    if(file.type.split('/')[0] != 'image'){
      return alert('Only image files');
    }
    else{
      const task = this.storage.upload(path, file);
      const ref = this.storage.ref(path);
      this.downloadURL = ref.getDownloadURL();
      this.uploadPercent = task.percentageChanges();
      console.log("Download URL of image is::"+this.downloadURL);
      ref.getDownloadURL().subscribe(url =>{
        console.log("Post image url is::"+url);
        this.imageURL = url;
      });
      // task.snapshotChanges().pipe(
      //   finalize( () => {
      //     this.downloadURL = ref.getDownloadURL();
      //    // console.log("Download URL of image is::"+this.downloadURL);
      //     this.downloadURL.subscribe( url => {
      //       console.log("Post image url is::"+url);
      //       this.imageURL = url;
      //     });
      //       console.log("Image uploaded!!");
      //   })
      // );
    }
  }
  /*
  uploadPhotoURL(event):void {
    const file = event.target.files[0];
    const path = `users/${this.user.uid}/photos/${file.name}`;
    console.log("file name is::"+file.name)
    if (file.type.split('/')[0] !== 'image') {
      return alert('only images allowed');
    } else {
      this.task = this.storage.upload(path, file);
      const ref = this.storage.ref(path);
      // and change the observable here
      ref.getDownloadURL().subscribe(url => {
        this.userService.updateProfileData(this.user.displayName, url);
      });
    }
  }
   */
}
