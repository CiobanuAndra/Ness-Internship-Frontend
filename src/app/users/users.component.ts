import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { UsersListTable } from '../interfaces/users-list-table';
import { UsersFilter } from '../enums/users-filter';
import { MatSort } from '@angular/material/sort';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private userService: UsersService) {}

  UsersFilterIndex = {
    [UsersFilter.ALL]: 0,
    [UsersFilter.ACTIVE]: 1,
    [UsersFilter.INACTIVE]: 2,
  };
  selectedTabIndex: number = this.UsersFilterIndex[UsersFilter.ALL];
  totalCourses = 0;
  displayedColumns: string[] = [
    'name',
    'status',
    'taskCompleted',
    'leftDays',
    'dateAdded',
    'settings',
  ];
  UsersFilterValues = Object.values(UsersFilter);
  dataSource: UsersListTable[] = [];
  buttons: any = ['export csv', 'add user', 'add bulk users'];

  filterActiveUsers() {
    this.userService.getActiveUsers().subscribe((values) => {
      this.dataSource = values;
    });
  }

  filterInactiveUsers() {
    this.userService.getInactiveUsers().subscribe((values) => {
      this.dataSource = values;
    });
  }

  filterAllUsers() {
    this.userService.getAllUsers().subscribe((values) => {
      this.dataSource = values;
    });
  }

  onTabChange(event: MatTabChangeEvent) {
    switch (event.index) {
      case 0:
        this.filterAllUsers();
        break;
      case 1:
        this.filterActiveUsers();
        break;
      case 2:
        this.filterInactiveUsers();
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    this.totalCourses = this.userService.totalCourses;
    this.filterAllUsers();
  }
}
