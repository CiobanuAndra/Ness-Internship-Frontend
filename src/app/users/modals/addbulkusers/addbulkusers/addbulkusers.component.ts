import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { AddbulkuserTableComponent } from './tables/addbulkuser-table/addbulkuser-table.component';
import { UserModal } from 'src/app/interfaces/users/user-modal.model';
import { UsersService } from 'src/app/services/users/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { tableHeaders } from 'src/app/enums/addbulkuser-table';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddBulkUsersComponent } from 'src/app/users/sidenavs/add-bulk-users/add-bulk-users.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addbulkusers',
  templateUrl: './addbulkusers.component.html',
  styleUrls: ['./addbulkusers.component.scss'],
})
export class AddbulkusersComponent implements OnInit {
  @ViewChild(AddbulkuserTableComponent) child!: AddbulkuserTableComponent;

  selectedTableAttention = tableHeaders.attention;
  selectedTableConfirmation = tableHeaders.confirmation;

  dataSourceAttention = new MatTableDataSource<UserModal>();
  dataSourceConfirmation = new MatTableDataSource<UserModal>();

  usersAttention = 0;
  usersConfirmation = 0;
  usersToUpload = 0;

  usersToCheck = [];
  combinedUsers = {};

  formDataEditUser!: UserModal;
  userIndex!: UserModal;
  functionEditState = false;

  constructor(private usersService: UsersService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchUsers();
    this.concatArrays();
    this.listenEditUser();
  };

  fetchUsers(): void {
    this.fetchUserAwaitModal();
    this.fetchUserRequireModal();
  };

  fetchUserRequireModal(): void {
    this.dataSourceAttention.data = this.data.invalidUsers;
    this.usersAttention += this.data.invalidUsers.length;
    this.usersToUpload += this.usersAttention;
  };

  fetchUserAwaitModal(): void {
    this.dataSourceConfirmation.data = this.data.validUsers;
    this.usersConfirmation += this.data.validUsers.length;
    this.usersToUpload += this.usersConfirmation;
  };

  editUser(): void {
    this.recieveUserDataForm();

    const index = Number(this.userIndex);

    if (index !== -1) {
      if(this.formDataEditUser.name !== '') {
        this.updateUserField(index, 'name', this.formDataEditUser.name);
      }
      if(this.formDataEditUser.surname !== '') {
        this.updateUserField(index, 'surname', this.formDataEditUser.surname);
      }
      if(this.formDataEditUser.email !== '') {
        this.updateUserField(index, 'email', this.formDataEditUser.email);
      }
    }

    this.resetVariablesWhenActionOccurs();
    this.concatArrays();
    this.validateUsers();
  };

  deleteUserInvalid(userIndex: number): void {
    this.resetVariablesWhenActionOccurs();
  
    userIndex !== -1? this.data.invalidUsers.splice(userIndex, 1) : null;
  
    this.fetchUsers();
  };

  deleteUserValid(userIndex: number): void {
    this.resetVariablesWhenActionOccurs();
  
    userIndex !== -1? this.data.validUsers.splice(userIndex, 1) : null;
  
    this.fetchUsers();
  };

  //Check if tables have users with problems and if no proceed to submit
  public addUsers(): void {
    if (this.data.invalidUsers.length > 0) {
      this.child.expandMultipleRows();
    }
    else {
      this.usersService.addBulkUsers(this.combinedUsers).subscribe({
        next: (response) => {
          console.log(response.message);
        }
      })
    }
  };

  //UTILS
  resetVariablesWhenActionOccurs(): void {
    this.usersToUpload = 0;
    this.usersConfirmation = 0;
    this.usersAttention = 0;
  };

  concatArrays(): void {
    const usersValid = this.data.validUsers.map((user: any) => ({
      name: user.name,
      surname: user.surname,
      email: user.email,
    }));

    const usersInvalid = this.data.invalidUsers.map((user: any) => ({
      name: user.user.name,
      surname: user.user.surname,
      email: user.user.email,
    }));

    this.combinedUsers = {
      users: this.usersToCheck.concat(usersValid, usersInvalid),
    }
  };

  recieveUserDataForm(): void {
    this.usersService.editUserFormData$.subscribe(data => {
      this.formDataEditUser = data.formData;
      this.userIndex = data.userDetails;
      this.functionEditState = data.functionState;
    }
    )
  };

  updateUserField(index: number, field: UserField, value: string): void {
    this.dataSourceAttention.data[index].user![field] = value;
  };

  listenEditUser(): void {
    this.usersService.editUserFormData$.subscribe((functionState: boolean) => {
      if (functionState) {
        this.editUser();
      }
    });
  };

  validateUsers(): void {
    this.usersService.validateUsers(this.combinedUsers).subscribe({
      next: (response) => {
        this.data.invalidUsers = response.invalidUsers;
        this.data.validUsers = response.validUsers;
        this.fetchUsers();
      }
    })
  };
}
