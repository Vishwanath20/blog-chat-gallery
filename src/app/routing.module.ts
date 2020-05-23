import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: '', loadChildren:'./auth/auth.module#AuthModule'}
];

@NgModule({
  declarations: [],
  imports: []
})
export class RoutingModule { }
