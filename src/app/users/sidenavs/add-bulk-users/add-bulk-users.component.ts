import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

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
  dataSource = new MatTableDataSource<any>();

  constructor() {}

  closeSidenav(): void {
    this.closeSidenavEvent.emit();
  }

  ngOnInit() {
    this.dataSource.data = [
      { firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com' },
      { firstname: 'Jane', lastname: 'Smith', email: 'jane.smith@example.com' },
      { firstname: '...', lastname: '...', email: '...' },
    ];
  }
}
