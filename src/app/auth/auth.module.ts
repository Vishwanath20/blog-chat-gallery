import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule} from '../shared/shared.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MaterialModule} from '../material.module';


const routes: Routes = [
  {path: 'signin', component: SigninComponent, data:{title: 'Sing in'}},
  {path: 'signup', component: SignupComponent, data:{title: 'Sing up'}},
  {path: 'reset-password', component: ResetPasswordComponent, data:{title: 'reset password'}},
]

@NgModule({
  declarations: [SigninComponent, SignupComponent, ResetPasswordComponent],
  imports: [RouterModule.forChild(routes), SharedModule,  MaterialModule] 
})
export class AuthModule { }
