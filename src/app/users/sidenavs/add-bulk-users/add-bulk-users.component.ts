import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/services/users/users.service';
import { UsersListTable } from 'src/app/interfaces/users-list-table';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddbulkusersComponent } from '../../modals/addbulkusers/addbulkusers/addbulkusers.component';

@Component({
  selector: 'app-add-bulk-users',
  templateUrl: './add-bulk-users.component.html',
  styleUrls: ['./add-bulk-users.component.scss'],
})
export class AddBulkUsersComponent implements OnInit {
  @Input() opened!: boolean;
  @Output() closeSidenavEvent = new EventEmitter<void>();

  invalidUsersResponse = [];
  validUsersResponse = [];

  fileControl = new FormControl(null);
  displayedColumns: string[] = ['firstname', 'lastname', 'email'];
  dataSource = new MatTableDataSource<UsersListTable>();
  private destroy$ = new Subject<void>();

  constructor(private usersService: UsersService, private dialog: MatDialog) {}

  closeSidenav(): void {
    this.closeSidenavEvent.emit();
  }

  addFromListener() {
    this.fileControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (files: any) => {
        try {
          const response = await this.usersService.uploadCSVFile(files);
          this.invalidUsersResponse = response.invalidUsers;
          this.validUsersResponse = response.validUsers;
        } catch (error) {
          console.error('Error loading file.', error);
        }
      });
  }

  openAddBulkUsers() {
    this.dialog.open(AddbulkusersComponent, {
      autoFocus: false,
      data: {
        invalidUsers: this.invalidUsersResponse,
        validUsers: this.validUsersResponse,
      },
    });
    this.closeSidenav();
  }

  ngOnInit() {
    this.usersService
      .getUsersFromCSVFile()
      .pipe(takeUntil(this.destroy$))
      .subscribe((values: UsersListTable[]) => {
        this.dataSource.data = values;
        this.dataSource.data.push({
          firstname: '...',
          lastname: '...',
          email: '...',
          status: true,
          coursesCompleted: 0,
          leftDays: 0,
          dateAdded: new Date(),
        });
      });
      this.addFromListener();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
