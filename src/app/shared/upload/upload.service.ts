import { Injectable } from '@angular/core';
import { 
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { AngularFireStorage} from  '@angular/fire/storage'; //'angularfire2/storage'
import { Observable} from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Md5 } from 'ts-md5'
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  downloadURL: Observable<String>;
  uploads: AngularFirestoreCollection<any>;


  constructor( private afs: AngularFirestore, private storage: AngularFireStorage) { }

  uploadTask(path, file,meta, uploadType){
    console.log("### Inside the upload-service--Path is:::"+path);
    const nameHash = Md5.hashStr(file.name + new Date().getTime());
    const fileExt = file.type.split('/')[1];
    const name = `${nameHash}.${fileExt}`;
    console.log("## Inside the upload-service--image name is::"+name);

    const newMeta = {
      ...meta,
      someMoreData: 'Moooore data'
    };

   
    const ref = this.storage.ref(`${path}/${name}`);
    console.log("### Inside the upload-service--Ref-1 is:::"+ref);
    const task = ref.put(file, { customMetadata: newMeta });
    console.log("### Inside the upload-service--Ref is:::"+ref);
    console.log("### Inside the upload-service--Task is:::"+task.toString());
    //this.downloadURL = ref.getDownloadURL();
    //console.log("Inside the upload-service--downloadURL-1 is:::"+this.downloadURL);
       // add the following lines
       
        task.snapshotChanges().pipe(
          finalize(() => {
              ref.getDownloadURL().subscribe(url => {
                  this.downloadURL = url;
                  console.log("Inside the upload-service--downloadURL is--:::"+this.downloadURL);
                  console.log("Type is::"+typeof(this.downloadURL));
                  if (uploadType === true) {
                    console.log("Inside the upload-service--iif statement:::");
                    // saves as collection
                    this.uploads = this.afs.collection(path);
                    this.downloadURL = ref.getDownloadURL();
                    console.log("New DOwnload url is:::"+this.downloadURL);
                    this.downloadURL.subscribe(url => {
                      const data = { name, url };
                      this.uploads.add(data);
                    });
                  } else {
                    // saves as document field
                    this.downloadURL.subscribe(url => {
                      this.afs.doc(path).update({ url });
                    });
                  }
                });
              
          //  ref.getDownloadURL().subscribe(downloadURL => {console.log("Inside the upload-service--downloadURL is:::"+downloadURL);})
            
            //          this.downloadURL = ref.getDownloadURL();
            //          this.downloadURL.subscribe(url => (this.imageURL = url));
  
           //  console.log('Image Uploaded!');
          })).subscribe();

          
           
  
        
          
      
   
      //);
  
      // if (uploadType === true) {
      //   console.log("Inside the upload-service--inside the uploadType is:::");
      //   // saves as collection
      //   this.uploads = this.afs.collection(path);
      //   this.downloadURL.subscribe(url => {
      //     const data = { name, url };
      //     this.uploads.add(data);
      //   });
      // } else {
      //   // saves as document field
      //   this.downloadURL.subscribe(url => {
      //     this.afs.doc(path).update({ url });
      //   });
      // }
  


  }
}
