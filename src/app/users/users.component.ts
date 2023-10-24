import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { UsersListTable } from '../interfaces/users-list-table';
import { UsersFilter } from '../enums/users-filter';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<UsersListTable>();
  UsersFilterValues = Object(UsersFilter);
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
    'coursesCompleted',
    'leftDays',
    'dateAdded',
    'settings',
  ];

  constructor(private userService: UsersService) {}

  filterActiveUsers(): void {
    this.userService.getActiveUsers().subscribe((values) => {
      this.dataSource.data = values;
    });
  }

  filterInactiveUsers(): void {
    this.userService.getInactiveUsers().subscribe((values) => {
      this.dataSource.data = values;
    });
  }

  filterAllUsers(): void {
    this.userService.getAllUsers().subscribe((values) => {
      this.dataSource.data = values;
    });
  }

  onTabChange(event: MatTabChangeEvent): void {
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

  downloadCsvFile(): void {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'UsersList',
      useBom: true,
      headers: [
        'Name',
        'Status',
        'Courses Completed',
        'Time Left',
        'Date Added',
      ],
    };
    new ngxCsv(this.dataSource.data, 'UsersList', options);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.totalCourses = this.userService.totalCourses;
    this.filterAllUsers();
  }
}
