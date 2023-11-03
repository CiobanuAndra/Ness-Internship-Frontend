import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { UsersListTable } from '../interfaces/users-list-table';
import { UsersFilter } from '../enums/users-filter';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ResourcesService } from '../services/resources/resources.service';
import { AddBulkUsersComponent } from './sidenavs/add-bulk-users/add-bulk-users.component';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit, OnInit {
  showSidenav = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('sidenav') sidenav!: ElementRef;

  dataSource = new MatTableDataSource<UsersListTable>();
  opened: boolean = false;
  UsersFilterValues = Object(UsersFilter);
  totalCourses = 0;
  sidenavOpen = false;

  UsersFilterIndex = {
    [UsersFilter.ALL]: 0,
    [UsersFilter.ACTIVE]: 1,
    [UsersFilter.INACTIVE]: 2,
  };
  selectedTabIndex: number = this.UsersFilterIndex[UsersFilter.ALL];
  displayedColumns: string[] = [
    'name',
    'status',
    'coursesCompleted',
    'leftDays',
    'dateAdded',
    'settings',
  ];
  users: any = [];

  constructor(
    private userService: UsersService,
    private cdr: ChangeDetectorRef,
    private resourcesService: ResourcesService,
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

  toggleBulkUsersSidenav() {
    this.opened = !this.opened;
    this.resourcesService.setSidenavVisibility(this.opened);
  }

  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
    this.resourcesService.setSidenavVisibility(this.showSidenav);
  };

  openAddBulkUsers() {
    const dialogRef = this.dialog.open(AddBulkUsersComponent, {
      autoFocus: false,
    });
  }

  filterActiveUsers(): void {
    this.userService.getActiveUsers().subscribe((values) => {
      this.dataSource.data = structuredClone(values);
      this.cdr.detectChanges();
    });
  }

  filterInactiveUsers(): void {
    this.userService.getInactiveUsers().subscribe((values) => {
      this.dataSource.data = structuredClone(values);
      this.cdr.detectChanges();
    });
  }

  filterAllUsers(): void {
    this.userService.getAllUsers().subscribe((values) => {
      this.dataSource.data = structuredClone(values);
      this.cdr.detectChanges();
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

  getAllUsers() {
    this.userService.getUsers().subscribe((val) => {
      console.log(val);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.userService.getTotalCourses().subscribe((val) => {
      this.totalCourses = structuredClone(val);
      this.cdr.detectChanges();
    });

    this.filterAllUsers();
  }

  ngOnInit() {
    this.getAllUsers();
  }
}
