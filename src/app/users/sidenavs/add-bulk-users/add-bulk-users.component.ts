import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/services/users.service';
import { UsersListTable } from 'src/app/interfaces/users-list-table';

@Component({
  selector: 'app-add-bulk-users',
  templateUrl: './add-bulk-users.component.html',
  styleUrls: ['./add-bulk-users.component.scss'],
})
export class AddBulkUsersComponent implements OnInit {
  @Input() opened!: boolean;
  @Output() closeSidenavEvent = new EventEmitter<void>();

  fileControl = new FormControl(null);

  displayedColumns: string[] = ['firstname', 'lastname', 'email'];
  dataSource = new MatTableDataSource<UsersListTable>();

  constructor(private usersService: UsersService) {}

  closeSidenav(): void {
    this.closeSidenavEvent.emit();
  }

  addFromListener() {
    this.fileControl.valueChanges.subscribe(async (files: any) => {
      await this.usersService.uploadCSVFile(files);
    });
  }

  ngOnInit() {
    this.usersService.getUsersFromCSVFile().subscribe((values) => {
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
  }
}
