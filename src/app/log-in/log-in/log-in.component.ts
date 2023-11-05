import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  hide = true;
//Prima varianta//
      loginForm = new FormGroup({
      emailFormControl : new FormControl('', [
        Validators.required,
        Validators.email,
      ]),

      passwordFormControl : new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
  });

  onSubmit(){
    console.log('user logged')
  }
}
