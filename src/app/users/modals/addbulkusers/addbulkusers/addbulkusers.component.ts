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

  constructor(private usersService: UsersService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.fetchUsers();
    this.concatArrays();
  }

  fetchUsers(): void {
    this.fetchUserAwaitModal();
    this.fetchUserRequireModal();
  }

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

  //Check if tables have users with problems and if no proceed to submit
  public addUsers(): void {
    if (this.data.invalidUsers.length > 0) {
      this.child.expandMultipleRows();
      this.usersService.validateUsers(this.combinedUsers).subscribe({
        next: (response) => {
          this.data.invalidUsers = response.invalidUsers;
          this.data.validUsers = response.validUsers;
        }
      })
    }
    else {
      this.usersService.addBulkUsers(this.combinedUsers).subscribe({
        next: (response) => {
          console.log(response.message);
        }
      })
    }
  };
}
