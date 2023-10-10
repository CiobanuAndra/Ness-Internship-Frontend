import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  data = [
    {
      name: 'John',
      status: 'Active',
      coursesCompleted: 5,
      timeLeft: '2 days',
      dateAdded: '2023-10-10',
    },
    {
      name: 'Jane',
      status: 'Inactive',
      coursesCompleted: 8,
      timeLeft: '1 day',
      dateAdded: '2023-10-09',
    },
  ];
  ngOnInit() {
    this.users = this.data;
  }
}
