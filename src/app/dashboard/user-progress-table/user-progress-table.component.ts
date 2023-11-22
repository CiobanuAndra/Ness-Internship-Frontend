import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { UsersProgressService } from '../../services/users-progress/user-progress.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { displayedColumns } from './table-config';
import { User } from '../../interfaces/users/user';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Subject, takeUntil, map } from 'rxjs';

@Component({
  selector: 'app-user-progress-table',
  templateUrl: './user-progress-table.component.html',
  styleUrls: ['./user-progress-table.component.scss'],
})
export class UserProgressTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<User>([]);
  columnsToDisplay = displayedColumns;
  rowsToDisplay!: number;
  screenHeight: number;
  private destroy$ = new Subject<void>();

  constructor(
    private userService: UsersProgressService,
    private liveAnnouncer: LiveAnnouncer,
    private router: Router
  ) {
    this.screenHeight = window.innerHeight;
  }

  calculateRemainingDays(activationEndDate: Date): number {
    const currentDate = new Date();
    const endDate = new Date(activationEndDate);
    const timeDifference = endDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  }

  filterAllUsers(): void {
    this.userService
      .getAllUsers()
      .pipe(
        map((response) => {
          return response.users.filter((user: any) => user.hasPlatformAccess);
        }),
        map((response) => {
          return response.map((user: any) => ({
            name: `${user.name} ${user.surname}`,
            taskCompleted: user.completedTasks,
            totalTasks: user.totalTasks,
            timeLeft: this.calculateRemainingDays(user.activationEndDate),
            dateRegistered: user.activationStartDate,
          }));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((values) => {
        this.rowsToDisplay = values.length;
        if (this.screenHeight > 900) {
          this.dataSource.data = values.slice(0, 11);
          this.rowsToDisplay = values.slice(0, 11).length;
        } else if (this.screenHeight > 700) {
          this.dataSource.data = values.slice(0, 6);
          this.rowsToDisplay = values.slice(0, 6).length;
        } else this.dataSource.data = values.slice(0, 4);
      });
  }

  viewAllUsers(): void {
    this.router.navigate(['users']);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.filterAllUsers();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
