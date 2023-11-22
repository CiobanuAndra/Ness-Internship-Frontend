import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { UserCard } from 'src/app/interfaces/users/user-card.model';
import { LeaderboardTabsEnum, tabsLeaderboard } from '../../enums/leaderboard-tabs.enum';
import { Router } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { dashboardUserMapper } from 'src/app/utils/userMapper';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  activeTab = tabsLeaderboard.InProgress;
  InProgress = tabsLeaderboard.InProgress;
  InDone = tabsLeaderboard.InDone;
  usersInProgress: UserCard[] = [];
  usersInDone: UserCard[] = [];
  leaderboardTabsEnum = LeaderboardTabsEnum;
  screenHeight: number;
  maxUsersToShow: number;
  private destroy$ = new Subject<void>();

  constructor(private userService: UsersService, private router: Router) {
    this.screenHeight = window.innerHeight;
    if (this.screenHeight >= 960) {
      this.maxUsersToShow = 13;
    } else if (this.screenHeight >= 700) {
      this.maxUsersToShow = 9;
    } else this.maxUsersToShow = 7;
  }

  ngOnInit() {
    this.getAllUsers();
  }

  updateActiveTabTitle(selectedIndex: number): void {
    const tabLabels: string[] = this.parseEnumToArray(LeaderboardTabsEnum) as string[];
    this.activeTab = tabLabels[selectedIndex];
  };

  parseEnumToArray(enumObject: any) {
    return Object.values(enumObject).filter((value) => isNaN(Number(value)));
  };

  getAllUsers(): void {
    this.userService
      .getAllUsersAPI()
      .pipe(
        map((data: any) =>
          data.users.map((user: any) => dashboardUserMapper(user))
        ),
        map((user: any) => {
          return {
            userInProgress: this.sortAndFilterUsers(user, false),
            userInDone: this.sortAndFilterUsers(user, true),
          };
        }),
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ userInProgress, userInDone }) => {
        this.usersInProgress = userInProgress;
        this.usersInDone = userInDone;
      });
  }

  private sortAndFilterUsers(users: UserCard[], status: boolean): UserCard[] {
    return users
      .filter((user) => user.status === status)
      .slice(0, this.maxUsersToShow)
      .sort((a, b) => a.rank - b.rank);
  }

  viewAllUsers(): void {
    this.router.navigate(['/leaderboard-table']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
