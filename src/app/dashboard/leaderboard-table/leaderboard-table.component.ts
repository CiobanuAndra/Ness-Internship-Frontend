import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { UserCard } from 'src/app/interfaces/users/user-card.model';
import { LeaderboardTabsEnum } from '../../enums/leaderboard-tabs.enum';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { map, takeUntil } from 'rxjs/operators';
import { dashboardUserMapper } from 'src/app/utils/userMapper';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-leaderboard-table',
  templateUrl: './leaderboard-table.component.html',
  styleUrls: ['./leaderboard-table.component.scss'],
})
export class LeaderboardTableComponent implements OnInit {
  activeTab: LeaderboardTabsEnum = LeaderboardTabsEnum.InProgress;
  usersInProgress: UserCard[] = [];
  usersInDone: UserCard[] = [];
  leaderboardTabsEnum = LeaderboardTabsEnum;
  displayedColumns = ['name', 'tasks', 'points', 'rank'];
  dataSource!: MatTableDataSource<UserCard>;
  private destroy$ = new Subject<void>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UsersService,
    private liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  updateActiveTabTitle(): void {
    this.activeTab === LeaderboardTabsEnum.InProgress
      ? this.activeTab = LeaderboardTabsEnum.Done : this.activeTab = LeaderboardTabsEnum.InProgress;
  };

  onPageChange(event: any) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.updateDataSource();
  }

  private updateDataSource() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;

    this.dataSource.data =
      this.activeTab === LeaderboardTabsEnum.InProgress
        ? this.usersInProgress.slice(startIndex, endIndex)
        : this.usersInDone.slice(startIndex, endIndex);
  }

  private getUsers() {
    this.userService
      .getLeaderboardUsers()
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((data: any) =>
          data.content.map((user: any) => dashboardUserMapper(user))
        ),
        map((users: UserCard[]) => {
          return {
            inProgress: this.sortAndFilterUsers(users, LeaderboardTabsEnum.InProgress),
            inDone: this.sortAndFilterUsers(users, LeaderboardTabsEnum.Done),
          };
        })
      )
      .subscribe(({ inProgress, inDone }) => {
        this.usersInProgress = inProgress;
        this.usersInDone = inDone;

        this.dataSource = new MatTableDataSource<UserCard>(
          this.activeTab === LeaderboardTabsEnum.InProgress
            ? this.usersInProgress
            : this.usersInDone
        );
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  private sortAndFilterUsers(users: UserCard[], status: LeaderboardTabsEnum): UserCard[] {
    return users
      .filter((user) => user.status === status)
      .sort((a, b) => a.rank - b.rank);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
