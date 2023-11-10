import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { UserCard } from 'src/app/interfaces/users/user-card.model';
import { LeaderboardTabsEnum } from '../../enums/leaderboard-tabs.enum';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { dashboardUserMapper } from 'src/app/utils/userMapper';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  activeTab: LeaderboardTabsEnum = LeaderboardTabsEnum.InProgress;
  usersInProgress: UserCard[] = [];
  usersInDone: UserCard[] = [];
  leaderboardTabsEnum = LeaderboardTabsEnum;
  screenHeight: number;

  maxUsersToShow: number;
  currentUsersNumber: any;

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

  getAllUsers(): void {
    
    this.userService
      .getAllUsersAPI()
      .pipe(
        map((data: any) => data.users.map((user: any) => dashboardUserMapper(user))),
        map((user: any) => {
          return {
            userInProgress: this.sortAndFilterUsers(user, false),
            userInDone: this.sortAndFilterUsers(user, true),
          };
        }),
        tap(user => {
          this.currentUsersNumber = user.userInDone;
        })
      )
      .subscribe(({userInProgress, userInDone}) => {
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
}
