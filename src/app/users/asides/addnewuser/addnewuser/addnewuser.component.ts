import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserModal } from 'src/app/interfaces/users/user-modal.model';
import { ResourcesService } from 'src/app/services/resources/resources.service';
import { UsersService } from 'src/app/services/users/users.service';

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

  errorMessage = '';

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private formBuilder: FormBuilder, private resourcesService: ResourcesService, private usersService: UsersService, private snackBar: MatSnackBar) { }

  addNewUserForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), this.specialChars]],
    surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), this.specialChars]],
    email: ['', [Validators.required, Validators.email, this.emailDomain]],
  });

  //error messages
  getErrorsMessage(): void {
    this.getErrorMessageEmail();
    this.getErrorMessageName();
    this.getErrorMessageSurname();
  }

  getErrorMessageName(): string {
    if (this.addNewUserForm.get('name')?.hasError('required')) {
      return 'Enter a name';
    } else if (this.addNewUserForm.get('name')?.hasError('minlength')) {
      return 'This name its too short';
    } else if (this.addNewUserForm.get('name')?.hasError('maxlength')) {
      return 'This name its too long';
    } else if (this.addNewUserForm.get('name')?.hasError('specialChars')) {
      return 'No special characters';
    } else return 'Name';
  };

  getErrorMessageSurname(): string {
    if (this.addNewUserForm.get('surname')?.hasError('required')) {
      return 'Enter a surname';
    } else if (this.addNewUserForm.get('surname')?.hasError('minlength')) {
      return 'This surname its too short';
    } else if (this.addNewUserForm.get('surname')?.hasError('maxlength')) {
      return 'This surname its too long';
    } else if (this.addNewUserForm.get('surname')?.hasError('specialChars')) {
      return 'No special characters';
    } else return 'Surname';
  };

  getErrorMessageEmail(): string {
    if (this.addNewUserForm.get('email')?.hasError('required')) {
      return 'Enter an email';
    } else if (this.addNewUserForm.get('email')?.hasError('email')) {
      return 'This is not an email';
    } else if (this.addNewUserForm.get('email')?.hasError('emailDomain')) {
      return 'This is not an email from Ness organization';
    } else return 'Email';
  };

  //check if email has ness domain
  emailDomain(control: AbstractControl): { [Key: string]: any } | null {
    const domain = control.value ? control.value.substring(control.value.lastIndexOf('@') + 1) : null;

    return domain && domain.toLowerCase() === 'ness.com' ? null : { 'emailDomain': true };
  }

  //check for special characters
  specialChars(control: AbstractControl): { [key: string]: boolean } | null {
    const specialChars = /[!@#$%^&*`()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    return (control.value && specialChars.test(control.value)) ? { specialChars: true } : null;
  }

  //change styles when an error comes in
  checkDisplayError(formControl: AbstractControl<any, any> | null, isSubmitted: boolean): boolean {
    return formControl === null ? false : (formControl.invalid && (formControl.dirty || formControl.touched || isSubmitted));
  };

  toggleInteractions(state: boolean): void {
    this.isSubmitted = state;
    this.isNameInputInteracted = state;
    this.isSurnameInputInteracted = state;
    this.isEmailInputInteracted = state;
  };

  //submit addNewUserForm 
  onSubmit(): void {
    if (this.addNewUserForm.invalid) {
      this.getErrorsMessage();
      this.toggleInteractions(true);
      return;
    }

    const userData = {
      ...this.addNewUserForm.value as UserModal
    }
    
    //hardcoded ID
    const userId = '1';

    this.usersService.addNewUser(userData, userId).subscribe(
      {
        next: () => {
          this.toastMessage('User added successfully!', 'green-snackbar');
          this.closeAside();
        },
        error: (error) => {
          this.toastMessage(error.message, 'red-snackbar');
        }
      })
  };

  toastMessage(message: string, colorClass: string): void {
    this.snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: colorClass
    });
  };

  closeAside(): void {
    this.showSidenav = false;
    this.showSidenavChange.emit(this.showSidenav);
    this.resourcesService.setSidenavVisibility(false);
  };
}