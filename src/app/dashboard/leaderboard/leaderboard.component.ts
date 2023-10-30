import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { UserCard } from 'src/app/interfaces/users/user-card.model';
import { map } from 'rxjs';
import { LeaderboardTabsEnum } from '../../enums/leaderboard-tabs.enum';
import { Router } from '@angular/router';

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

  constructor(private userService: UsersService, private router: Router) {
    this.screenHeight = window.innerHeight;
    if (this.screenHeight >= 960) {
      this.maxUsersToShow = 14;
    } else if (this.screenHeight >= 750) {
      this.maxUsersToShow = 10;
    } else this.maxUsersToShow = 7;
  }

  ngOnInit() {
    this.userService
      .loadUsersLeaderboard()
      .pipe(
        map((leaderboard) => {
          return {
            usersInProgress: leaderboard
              .filter((user) => !user.status)
              .slice(0, this.maxUsersToShow),
            usersInDone: leaderboard
              .filter((user) => user.status)
              .slice(0, this.maxUsersToShow),
          };
        })
      )
      .subscribe(({ usersInProgress, usersInDone }) => {
        this.usersInProgress = usersInProgress;
        this.usersInDone = usersInDone;
      });
  }

  viewAllUsers(): void {
    this.router.navigate(['/main-page/leaderboard-table']);
  }
}
