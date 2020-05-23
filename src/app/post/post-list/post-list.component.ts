import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import{ Post} from '../post.model';
import { PostService} from '../post.service';
import { database } from 'firebase';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

posts:Observable<Post[]>;

  constructor( private postService: PostService) { }

  ngOnInit() {
    this.posts = this.postService.getPosts();
    console.log("posts published date is:: "+this.posts);

    this.posts.forEach( ele =>{
      console.log("Posts data is::"+JSON.stringify(ele));
      
    });

    
  }

}
