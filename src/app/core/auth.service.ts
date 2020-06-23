import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import * as firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { Observable, of } from "rxjs";
import { first } from "rxjs/operators";
import { switchMap } from 'rxjs/operators';

import { Md5 } from "ts-md5/dist/md5";

import { User } from "../user/user.model";

@Injectable()
export class AuthService {
  user: Observable<User>;
  authState: firebase.User;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
       // this.authState = user;
        //console.log("Firebase User Object: ", this.authState);
        if (user) {
          console.log("App User: ", this.user);
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.afAuth.authState.subscribe( data => this.authState = data );
    console.log("### Inside the auth service - this.user:: "+this.user);
  }

  getUser() {
    return this.user.pipe(first()).toPromise();
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
      console.log("### Inside the auth service - this.authenticated:: "+this.authenticated);
      console.log("### Inside the auth service - this.authState.uid:: "+this.authState.uid);
      console.log("### Inside the auth service - this.authState:: "+this.authState);
        return this.authenticated ? this.authState.uid : null;
       }


  emailSignIn(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("You have successfully signed in");
        this.router.navigate(["blog"]);
      } )
      .catch(error => {
        alert("Invalid Email or Password !! Please try again.. ");
        console.log(error.message)
      })
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => this.updateUserData(data.user))
      .then(() => console.log("Welcome, your account has been created!"))
      .then(() => {
        this.afAuth.auth.currentUser
          .sendEmailVerification()
          .then(() => console.log("We sent you an email verification"))
          .catch(error => console.log(error.message));
      })
      .catch(error => console.log(error.message));
  }

  resetPassword(email: string) {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => console.log(`We've sent you a password reset link`))
      .catch(error => console.log(error.message));
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["signin"]);
    });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.socialLogin(provider);
  }
  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.socialLogin(provider);
  }
  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.socialLogin(provider);
  }

  private socialLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        this.updateUserData(credential.user);
      })
      .catch(error => console.log(error.message));
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName,
      photoURL:
        user.photoURL ||
        "https://www.gravatar.com/avatar/" +
          Md5.hashStr(user.uid) +
          "?d=identicon"
    };
    return userRef.set(data, { merge: true });
  }
}

//----------------------------------------------------//

// import { Injectable } from '@angular/core';
// import { Router} from '@angular/router';
// import * as firebase from 'firebase/app';
// import {  AngularFireAuth} from 'angularfire2/auth';
// import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
// import { Observable, of } from "rxjs";
// import { switchMap, first } from "rxjs/operators";
// import { error } from 'util';
// import {Md5} from 'ts-md5/dist/md5';

// interface User{
//   uid:string;
//   email:string;
//   photoURL?: string;
//   displayName?: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   user: Observable<User>;
//  // authState:any=null;
//  authState: firebase.User;

//   constructor(
//     public afAuth: AngularFireAuth,
//     private afs: AngularFirestore,
//     private router: Router
//    )
//   { 
//      this.user = this.afAuth.authState.pipe(switchMap( user => {
//             this.authState = user;
//             console.log("Firebase User Object: ", this.authState);
//            if(user){
//             console.log("App User: ", this.user);
//           return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
//       }
//       else{
//          return of(null);
//        }
//     }))

//      this.afAuth.authState.subscribe(data => this.authState = data)
//   }

//   get authenticated():boolean{
//     return this.authState!== null;
//   }

//   // get currentUserId():string{
//   //   return this.authenticated ? this.authState.uid : null;
//   // }

//   get currentUserId(): string {
//     return this.authenticated ? this.authState.uid : null;
//   }

//   emailSignIn( email: string, password: string){
//     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
//     .then(() => console.log("##### you have successful signed in #####"))
//     .catch(error => console.log(error.message));
//   }

//   emailSignUp(email:string, password:string){
//     return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
//     .then(user => this.updateUserData(user.user))
//     .then( () => console.log("##### Welcome your account has been created #####"))
//     .then ( user => {
//       this.afAuth.auth.currentUser.sendEmailVerification()
//       .then(() => console.log("#### We sent you an email verification ####"))
//       .catch( error => console.log(error.message))
//     })
//     .catch( error => console.log(error.message));
//   }

//   resetPassword(email: string){
//     return firebase.auth().sendPasswordResetEmail(email)
//     .then(() => console.log("#### We have sent you a password reset link ####"))
//     .catch( error => console.log(error.message))
//   }

//   signOut(){
//     return this.afAuth.auth.signOut()
//     .then( () => {
//       this.router.navigate(['/'])
//     })
//   }

//   private socialLogin(provider){
//     return this.afAuth.auth.signInWithRedirect(provider)
//     .then( credential => {
//       return this.updateUserData(credential)
//     })
//     .catch( error => console.log(error.message))
//   }

//   googleLogin(){
//     const provider = new firebase.auth.GoogleAuthProvider()
//     return this.socialLogin(provider)
//   }

//   githubLogin(){
//     const provider = new firebase.auth.GoogleAuthProvider()
//     return this.socialLogin(provider)
//   }

//   facebookLogin(){
//     const provider = new firebase.auth.GoogleAuthProvider()
//     return this.socialLogin(provider)
//   }

//   twitterLogin(){
//     const provider = new firebase.auth.GoogleAuthProvider()
//     return this.socialLogin(provider)
//   }



//   private updateUserData(user){
//     const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`)
//     console.log("#### userRef is:: "+String(userRef));

//     const data: User = {
//       uid: user.uid,
//       email: user.email || null,
//       displayName: user.displayName,
//       photoURL: user.photoURL || "http://www.gravatar.com/avatar/" + Md5.hashStr(user.uid) + "?d=identicon"
//     }
//     return userRef.set(data);
  
//   }



 
// }
