import { Component, OnInit, Input} from '@angular/core';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Input() path;
  @Input() meta;
  @Input() uploadType;

  selection: FileList;

  constructor(private uploadService: UploadService) {}


  ngOnInit( ) {
  }

  detect(event:any){
    console.log("## Inside the upload-component-detect() ##")
    this.selection = event.target.files;
    console.log(this.selection);
    // console.log(this.selection[0]);
    // console.log(this.selection[3]);
  }

  upload() {

    const file = this.selection[0];
    console.log("### Inside the upload component-- file is:::"+file);
    if (file.type.split('/')[0] === 'image') {
      this.uploadService.uploadTask(this.path, file, this.meta, this.uploadType);
    } else {
      console.log('image only pls');
    }
  }


}
