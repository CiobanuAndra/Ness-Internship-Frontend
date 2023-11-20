import { Component, Inject} from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  stateInputEmail = false;

  horizontalPosition: MatSnackBarHorizontalPosition = SnackBarPosition.positionCenter;
  verticalPosition: MatSnackBarVerticalPosition = SnackBarPosition.positionTop;

  functionState = false;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data:any, private dialogRef: MatDialogRef<EdituserComponent>) {}

  editUserForm = this.formBuilder.group({
    name: [''],
    surname: [''],
    email: [''],
  });

  toggleInteractions(state: boolean): void {
    this.isSubmitted = state;
    this.isNameInputInteracted = state;
    this.isSurnameInputInteracted = state;
    this.isEmailInputInteracted = state;
  };

  onSubmit(): void {
      const userFormData = {
        ...this.editUserForm.value
      }

      this.functionState = true;
      this.usersService.sendEditUserFormData(userFormData, this.data.user, this.functionState);
      this.closeDialog();
  };

  closeDialog(){
    this.dialogRef.close();
  }
}
