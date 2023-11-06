import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { UserCard } from 'src/app/interfaces/users/user-card.model';
import { LeaderboardTabsEnum } from '../../enums/leaderboard-tabs.enum';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';

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

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UsersService,
    private liveAnnouncer: LiveAnnouncer,
  ) {}

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

  setActiveTab(tab: LeaderboardTabsEnum): void {
    this.activeTab = tab;
    this.dataSource.data = tab === LeaderboardTabsEnum.InProgress ? this.usersInProgress : this.usersInDone;
  }

  onPageChange(event: any) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.updateDataSource();
  }

  private updateDataSource() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;

    this.dataSource.data = this.activeTab === LeaderboardTabsEnum.InProgress
      ? this.usersInProgress.slice(startIndex, endIndex)
      : this.usersInDone.slice(startIndex, endIndex);
  }

  private getUsers() {
    this.userService.getAllUsersAPI().subscribe((data: any) => {
      const users: UserCard[] = data.users.map((user: any) => ({
        name: `${user.name} ${user.surname}`,
        totalTasks: user.totalTasks,
        completedTasks: user.completedTasks,
        points: user.score,
        rank: user.rank,
      }));
  
      this.usersInProgress = users.filter((user) => user.completedTasks < user.totalTasks);
      this.usersInDone = users.filter((user) => user.completedTasks === user.totalTasks);
  
      this.dataSource = new MatTableDataSource<UserCard>(
        this.activeTab === LeaderboardTabsEnum.InProgress ? this.usersInProgress : this.usersInDone
      );
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}