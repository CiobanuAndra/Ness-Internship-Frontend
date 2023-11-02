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
  maxUsersToShow: number = 8;

  constructor(private userService: UsersService, private router: Router) {}

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
    this.router.navigate(['leaderboard-table']);
  }
}
