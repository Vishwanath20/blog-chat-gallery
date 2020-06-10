import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { UserService } from '../user.service';
import { User} from '../user.model';
import { Observable } from 'rxjs';
import { ThreadService } from 'src/app/chat/thread.service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;
 // user: Observable<User>;

 val:User;

  constructor( 
    private route: ActivatedRoute,
    private userService: UserService,
    private threadService: ThreadService 
    ) { }

    ngOnInit() {
      this.getUser();

  }


  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(user => (this.user = user));
  }

  chat(){
    const profileId = this.route.snapshot.paramMap.get('id'); 
    return this.threadService.createThread(profileId)
    .then( () => console.log("Thread Created"))
    .catch( error => console.log(error))
  }

}
