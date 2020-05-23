import { NgModule  } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { PostModule} from '../post/post.module';
import { UserService } from './user.service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';

const routes:Routes = [
  { path:'me', component:UserDashboardComponent, data:{ title: "User Dashboard"}},
  { path:'users', component:UserListComponent, data:{ title: "Users List "}},
  { path:'users/:id', component:UserDetailsComponent, data:{ title: "User Profile"}}
]

@NgModule({
  declarations: [UserDashboardComponent, UserDetailsComponent, UserListComponent, UserListItemComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PostModule
  ],

  exports: [UserListItemComponent, UserListComponent],  

  providers: [UserService]
 
})
export class UserModule { }
