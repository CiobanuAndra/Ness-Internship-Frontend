import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { UsersFilter } from '../enums/users-filter';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ResourcesService } from '../services/resources/resources.service';
import { AddBulkUsersComponent } from './sidenavs/add-bulk-users/add-bulk-users.component';
import { User } from '../interfaces/users/user';
import { Subject, takeUntil } from 'rxjs';

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

  dataSource = new MatTableDataSource<User>([]);
  opened: boolean = false;
  UsersFilterValues = Object(UsersFilter);
  totalCourses = 0;
  sidenavOpen = false;
  private destroy$ = new Subject<void>();

  UsersFilterIndex = {
    [UsersFilter.ALL]: 0,
    [UsersFilter.ACTIVE]: 1,
    [UsersFilter.INACTIVE]: 2,
  };
  selectedTabIndex: number = this.UsersFilterIndex[UsersFilter.ALL];
  displayedColumns: string[] = [
    'name',
    'hasPlatformAccess',
    'completedTasks',
    'leftDays',
    'activationStartDate',
    'settings',
  ];

  constructor(
    private userService: UsersService,
    private resourcesService: ResourcesService,
    private dialog: MatDialog
  ) {}

  toggleBulkUsersSidenav() {
    this.opened = !this.opened;
    this.resourcesService.setSidenavVisibility(this.opened);
  }

  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
    this.resourcesService.setSidenavVisibility(this.showSidenav);
  }

  openAddBulkUsers() {
    this.showSidenav = false;
    this.dialog.open(AddBulkUsersComponent, {
      autoFocus: false,
    });
  }

  calculateRemainingDays(activationEndDate: Date): number {
    const currentDate = new Date();
    const endDate = new Date(activationEndDate);
    const timeDifference = endDate.getTime() - currentDate.getTime();
    const remainingDays = Math.max(
      0,
      Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
    );
    return remainingDays;
  }

  filterActiveUsers() {
    this.userService
      .filterActiveUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => {
        const activeUsersWithLeftDays = users.map(
          (user: { activationEndDate: Date }) => ({
            ...user,
            leftDays: this.calculateRemainingDays(user.activationEndDate),
          })
        );
        this.userService.updateUsersAdded(activeUsersWithLeftDays);
        this.userService.usersUpdateTable$.subscribe((users) => {
          this.dataSource.data = users;
        });
      });
  }

  filterInactiveUsers() {
    this.userService
      .filterInactiveUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((filteredUsers) => {
        const inactiveUserWithLeftDays = filteredUsers.map(
          (user: { activationEndDate: Date }) => ({
            ...user,
            leftDays: this.calculateRemainingDays(user.activationEndDate),
          })
        );
        this.userService.updateUsersAdded(inactiveUserWithLeftDays);
        this.userService.usersUpdateTable$.subscribe((users) => {
          this.dataSource.data = users;
        });
      });
  }

  filterAllUsers(): void {
    this.userService
      .getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((values) => {
        const usersWithLeftDays = values.users.map(
          (user: { activationEndDate: Date }) => ({
            ...user,
            leftDays: this.calculateRemainingDays(user.activationEndDate),
          })
        );
        this.userService.updateUsersAdded(usersWithLeftDays);
        this.userService.usersUpdateTable$.subscribe((users) => {
          this.dataSource.data = users;
        });
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

  subscribeUsersChanges(): void {
    this.userService.isNewUserAdded$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) this.filterAllUsers();
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.filterAllUsers();
    this.subscribeUsersChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
