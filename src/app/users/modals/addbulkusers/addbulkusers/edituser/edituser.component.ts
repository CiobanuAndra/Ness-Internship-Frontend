import { Component, Inject, OnInit} from '@angular/core';
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
export class EdituserComponent implements OnInit {
  functionState = false;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data:any, private dialogRef: MatDialogRef<EdituserComponent>) {}

  editUserForm = this.formBuilder.group({
    name: [''],
    surname: [''],
    email: [''],
  });

  ngOnInit(): void {
    this.editUserForm.setValue({
      name: this.data.userDetails.name,
      surname: this.data.userDetails.surname,
      email: this.data.userDetails.email,
    });
  }

  onSubmit(): void {
      const userFormData = {
        ...this.editUserForm.value
      }

      this.functionState = true;
      this.usersService.sendEditUserFormData(userFormData, this.data.userIndex, this.functionState);
      this.closeDialog();
  };

  closeDialog(){
    this.dialogRef.close();
  }
}
