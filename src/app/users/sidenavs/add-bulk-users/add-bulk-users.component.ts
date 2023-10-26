import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/services/users.service';
import { UserFromCSVFile } from 'src/app/interfaces/user-from-csvfile';

@Component({
  selector: 'app-add-bulk-users',
  templateUrl: './add-bulk-users.component.html',
  styleUrls: ['./add-bulk-users.component.scss'],
})
export class AddBulkUsersComponent implements OnInit {
  @Input() opened!: boolean;
  @Output() closeSidenavEvent = new EventEmitter<void>();

  fileControl = new FormControl(null);
  fileForm = new FormGroup({
    file: this.fileControl,
  });

  displayedColumns: string[] = ['firstname', 'lastname', 'email'];
  dataSource = new MatTableDataSource<UserFromCSVFile>();

  constructor(private usersService: UsersService) {}

  closeSidenav(): void {
    this.closeSidenavEvent.emit();
  }

  ngOnInit() {
    this.usersService.getUsersFromCSVFile().subscribe((values) => {
      this.dataSource.data = values;
      this.dataSource.data.push({
        firstname: '...',
        lastname: '...',
        email: '...',
      });
    });
  }
}
