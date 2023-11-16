import { Component, OnInit, ViewChild } from '@angular/core';
import { AddbulkuserTableComponent } from './tables/addbulkuser-table/addbulkuser-table.component';
import { UserModal } from 'src/app/interfaces/users/user-modal.model';
import { UsersService } from 'src/app/services/users/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { tableHeaders } from 'src/app/enums/addbulkuser-table';
import { Subject, takeUntil } from 'rxjs';

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
  usersToUpdate = 0;

  private destroy$ = new Subject<void>();

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.fetchUserAwaitModal();
    this.fetchUserRequireModal();
  }

  //Check if tables have users with problems and if no proceed to submit
  public addUsers(): void {
    this.usersService
      .loadUsersRequireModal()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: UserModal[]) => {
        if (users.length > 0) {
          this.child.expandMultipleRows();
        } else {
          //Proceed to send data
        }
      });
  }

  fetchUserRequireModal(): void {
    this.usersService
      .loadUsersRequireModal()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.dataSourceAttention.data = data;
        this.usersAttention += data.length;
        this.usersToUpdate += data.length;
      });
  }

  fetchUserAwaitModal(): void {
    this.usersService
      .loadUsersAwaitModal()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.dataSourceConfirmation.data = data;
        this.usersConfirmation = data.length;
        this.usersToUpdate += data.length;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
