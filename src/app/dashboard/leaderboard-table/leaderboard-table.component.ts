import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { UserCard } from 'src/app/interfaces/user-card.model';
import { map } from 'rxjs';
import { LeaderboardTabsEnum } from '../enum/leaderboard-tabs.enum';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-leaderboard-table',
  templateUrl: './leaderboard-table.component.html',
  styleUrls: ['./leaderboard-table.component.scss'],
})
export class LeaderboardTableComponent implements AfterViewInit, OnInit {
  activeTab: LeaderboardTabsEnum = LeaderboardTabsEnum.InProgress;
  usersInProgress: UserCard[] = [];
  usersInDone: UserCard[] = [];
  leaderboardTabsEnum = LeaderboardTabsEnum;
  displayedColumns = ['name', 'tasksLeft', 'points', 'rank'];
  dataSource!: MatTableDataSource<UserCard>;

  constructor(
    private userService: UsersService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit() {
    this.userService
      .loadUsersLeaderboard()
      .pipe(
        map((leaderboard) => {
          return {
            usersInProgress: leaderboard.filter((user) => !user.status),
            usersInDone: leaderboard.filter((user) => user.status),
          };
        })
      )
      .subscribe(({ usersInProgress, usersInDone }) => {
        this.usersInProgress = usersInProgress;
        this.usersInDone = usersInDone;
        this.dataSource = new MatTableDataSource<UserCard>(
          this.activeTab === LeaderboardTabsEnum.InProgress
            ? this.usersInProgress
            : this.usersInDone
        );
      });
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Rows per page';
  }

  setActiveTab(tab: LeaderboardTabsEnum): void {
    this.activeTab = tab;
    this.dataSource.data =
      tab === LeaderboardTabsEnum.InProgress
        ? this.usersInProgress
        : this.usersInDone;
  }  
}
