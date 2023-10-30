import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-addnewuser',
  templateUrl: './addnewuser.component.html',
  styleUrls: ['./addnewuser.component.scss']
})
export class AddnewuserComponent {
  @Input() showSidenav!: boolean;
  @Output() showSidenavChange = new EventEmitter<boolean>();

  isSubmitted = false;
  isNameInputInteracted = false;
  isSurnameInputInteracted = false;
  isEmailInputInteracted = false;

  constructor(private formBuilder:FormBuilder) {}

  addNewUserForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email, this.emailDomain, Validators.minLength(10), Validators.maxLength(20)]],
  });

  //check if email has ness domain
  emailDomain(control: AbstractControl): {[Key: string]: any} | null {
    const email: string = control.value;
    const domain = email.substring(email.lastIndexOf('@') + 1);

    if(domain.toLowerCase() === 'ness.com') {
      return null;
    } else {
      return {'emailDomain': true};
    }
  }

  //error messages
  getErrorMessageName(): string {
    if (this.addNewUserForm.get('name')?.hasError('required')) {
      return 'It is necessary to enter a name';
    } else if(this.addNewUserForm.get('name')?.hasError('minlength')) {
      return 'This name its too short';
    } else if(this.addNewUserForm.get('name')?.hasError('maxlength')) {
      return 'This name its too long';
    } else return 'Name';
  };

  getErrorMessageSurname(): string {
    if (this.addNewUserForm.get('surname')?.hasError('required')) {
      return 'It is necessary to enter a surname';
    } else if(this.addNewUserForm.get('surname')?.hasError('minlength')) {
      return 'This surname its too short';
    } else if(this.addNewUserForm.get('surname')?.hasError('maxlength')) {
      return 'This surname its too long';
    } else return 'Name';
  };

  getErrorMessageEmail(): string {
    if (this.addNewUserForm.get('email')?.hasError('required')) {
      return 'It is necessary to enter an email';
    } else if(this.addNewUserForm.get('email')?.hasError('email')) {
      return 'This is not an email';
    } else if(this.addNewUserForm.get('email')?.hasError('emailDomain')) {
      return 'This is not an email from Ness organization';
    } else if(this.addNewUserForm.get('email')?.hasError('minlength')) {
      return 'This email its too short';
    } else if(this.addNewUserForm.get('email')?.hasError('maxlength')) {
      return 'This email its too long';
    } else return 'Email';
  };

  //change styles when an error comes in
  checkDisplayError(formControl: AbstractControl<any, any> | null, isSubmitted:boolean): boolean {
    if(formControl === null) {
      return false;
    }
    return (formControl.invalid && (formControl.dirty || formControl.touched || isSubmitted));
  };

  //submit addNewUserForm 
  onSubmit():void {
    this.isSubmitted = true;
    this.isNameInputInteracted = true;
    this.isSurnameInputInteracted = true;
    this.isEmailInputInteracted = true;

    if(this.addNewUserForm.invalid) {
      this.getErrorMessageEmail();
      this.getErrorMessageName();
      this.getErrorMessageSurname();
    } else {
      //proceed to add a new user
    }
  };

  closeAside(): void {
    this.showSidenav = false;
    this.showSidenavChange.emit(this.showSidenav);
  }
}