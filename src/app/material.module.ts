import { NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule, 
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatProgressBarModule
  ],
  exports: [
    MatButtonModule, 
    MatCardModule, 
    MatIconModule, 
    MatInputModule, 
    MatFormFieldModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatProgressBarModule
  ]
})
export class MaterialModule { }
