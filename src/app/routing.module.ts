import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { GalleryListComponent } from './gallery/gallery-list/gallery-list.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {path: '', component:HomePageComponent},
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: '', loadChildren:'./chat/chat.module#ChatModule'},
  {path: '', loadChildren:'./gallery/gallery.module#GalleryModule'},
  {path: '', loadChildren:'./auth/auth.module#AuthModule'}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
