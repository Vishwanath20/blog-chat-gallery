import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { GalleryListComponent } from './gallery/gallery-list/gallery-list.component';

const routes: Routes = [
  //{path: '', redirectTo: '/users', pathMatch: 'full'},
   //{path: '', component: GalleryListComponent},
   {path: '', loadChildren:'./gallery/gallery.module#GalleryModule'},
  {path: '', loadChildren:'./auth/auth.module#AuthModule'}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
