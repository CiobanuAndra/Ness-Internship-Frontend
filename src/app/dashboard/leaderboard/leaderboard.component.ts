import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { UserCard } from 'src/app/interfaces/user-card.model';
import { map } from 'rxjs';
import { LeaderboardTabsEnum } from '../enum/leaderboard-tabs.enum';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  activeTab: LeaderboardTabsEnum = LeaderboardTabsEnum.InProgress;
  isInProgressPress = true;
  isDonePress = false;
  usersInProgress: UserCard[] = [];
  usersInDone: UserCard[] = [];
  leaderboardTabsEnum = LeaderboardTabsEnum;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.loadUsersLeaderboard().pipe(
      map((leaderboard) => {
        return {
          usersInProgress: leaderboard.filter((user) => !user.status),
          usersInDone: leaderboard.filter((user) => user.status),
        }
      })
    ).subscribe(({usersInProgress, usersInDone}) => {
        this.usersInProgress = usersInProgress;
        this.usersInDone = usersInDone;
    });
  }
}