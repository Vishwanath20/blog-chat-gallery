import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule} from '../material.module';
import { FromNowPipe } from './from-now.pipe';
import { UploadComponent } from './upload/upload.component';
import { UploadService} from './upload/upload.service';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule} from '@angular/router'
@NgModule({
  declarations: [FromNowPipe, UploadComponent, NavbarComponent],
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, RouterModule],
  exports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, FromNowPipe, UploadComponent, NavbarComponent],
  providers: [UploadService]
})
export class SharedModule { }
