import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-bluck-users',
  templateUrl: './add-bluck-users.component.html',
  styleUrls: ['./add-bluck-users.component.scss'],
})
export class AddBluckUsersComponent implements OnInit {
  @Input() opened!: boolean;
  displayedColumns: string[] = ['firstname', 'lastname', 'email'];
  dataSource = new MatTableDataSource<any>();

  constructor() {}

  ngOnInit() {
    this.dataSource.data = [
      { firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com' },
      { firstname: 'Jane', lastname: 'Smith', email: 'jane.smith@example.com' },
      { firstname: '...', lastname: '...', email: '...' },
    ];
  }
}
