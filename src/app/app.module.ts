import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { AngularFireModule} from 'angularfire2';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { ServiceWorkerModule} from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { CoreModule } from './core/core.module';
import { RoutingModule } from './routing.module';
import { environment } from 'src/environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PostModule } from './post/post.module';
import { GalleryModule } from './gallery/gallery.module';
import { ChatModule } from './chat/chat.module';
import { SharedModule} from './shared/shared.module'
import { RoutingGuard } from './routing.guard';
import { from } from 'rxjs';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    CoreModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    AngularFireModule.initializeApp(environment.firebase),
    MatDividerModule,
    RoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    GalleryModule,
    PostModule,
    ChatModule,
    SharedModule
  ],
  providers: [ RoutingGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
