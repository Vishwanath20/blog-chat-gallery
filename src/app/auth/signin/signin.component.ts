import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Router} from '@angular/router';
import {Observable} from 'rxjs';

import {SharedModule} from '../../shared/shared.module';
import {AuthService} from '../../core/auth.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css','../auth.style.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  hide = true;
  name = new FormControl('');
  
  constructor(
    public fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { 
    this.signInForm = this.fb.group( {
      email: ['', [Validators.email, Validators.required]],
      password: ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]]
    })
  }

  ngOnInit() { }

  get email(){
    return this.signInForm.get('email')
  }

  get password(){
    return this.signInForm.get('password')
  }

  signIn(){
    console.log(`##### you are inside the signIn() #####`);
    return this.auth.emailSignIn(this.email.value, this.password.value)
    .then( user => {
      if(this.signInForm.valid){
        this.router.navigate(['/'])
      }
    })

  }
}
