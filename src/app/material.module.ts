import { NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule, 
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule                     
  ],
  exports: [
    MatButtonModule, 
    MatCardModule, 
    MatIconModule, 
    MatInputModule, 
    MatFormFieldModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule
  ]
})
export class MaterialModule { }
