import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private _userService: UsersService) {}

  displayedColumns: string[] = [
    'name',
    'status',
    'taskCompleted',
    'leftDays',
    'dateAdded',
    'settings',
  ];

  dataSource: any[] = [{ column1: 'name', column2: 'status' }];
  buttons: any = ['export csv', 'add user', 'add bulk users'];
  users: any[] = [];

  ngOnInit() {
    this._userService.getAllUsers().subscribe((users) => {
      this.dataSource = users;
    });
  }
}
