import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackBarPosition } from 'src/app/enums/snackbarposition';
import { UsersService } from 'src/app/services/users/users.service';
import { specialChars, emailDomain } from 'src/app/utils/formUtils';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent {
  isSubmitted = false;
  isNameInputInteracted = false;
  isSurnameInputInteracted = false;
  isEmailInputInteracted = false;

  errorMessage = '';

  horizontalPosition: MatSnackBarHorizontalPosition = SnackBarPosition.positionCenter;
  verticalPosition: MatSnackBarVerticalPosition = SnackBarPosition.positionTop;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private snackBar: MatSnackBar) { }

  editUserForm = this.formBuilder.group({
    name: ['', [Validators.minLength(3), Validators.maxLength(20), specialChars]],
    surname: ['', [Validators.minLength(3), Validators.maxLength(20), specialChars]],
    email: ['', [Validators.email, emailDomain]],
  });

  //error messages
  getErrorsMessage(): void {
    this.getErrorMessageEmail();
    this.getErrorMessageName();
    this.getErrorMessageSurname();
  }

  getErrorMessageName(): string {
    if (this.editUserForm.get('name')?.hasError('minlength')) {
      return 'This name its too short';
    } else if (this.editUserForm.get('name')?.hasError('maxlength')) {
      return 'This name its too long';
    } else if (this.editUserForm.get('name')?.hasError('specialChars')) {
      return 'No special characters';
    } else return 'Name';
  };

  getErrorMessageSurname(): string {
    if (this.editUserForm.get('surname')?.hasError('minlength')) {
      return 'This surname its too short';
    } else if (this.editUserForm.get('surname')?.hasError('maxlength')) {
      return 'This surname its too long';
    } else if (this.editUserForm.get('surname')?.hasError('specialChars')) {
      return 'No special characters';
    } else return 'Surname';
  };

  getErrorMessageEmail(): string {
    if (this.editUserForm.get('email')?.hasError('email')) {
      return 'This is not an email';
    } else if (this.editUserForm.get('email')?.hasError('emailDomain')) {
      return 'This is not an email from Ness organization';
    } else return 'Email';
  };

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

  onSubmit(): void {
    if (this.editUserForm.invalid) {
      this.getErrorsMessage();
      this.toggleInteractions(true);
      return;
    }
  };
}
