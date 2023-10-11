import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { UserCard } from 'src/app/interfaces/user-card.model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  activeTab: string = 'in-progress';
  isInProgressPress = true;
  isDonePress = false;
  leaderboardUsers: UserCard[] = [];
  usersInProgress: UserCard[] = [];
  usersInDone: UserCard[] = [];

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.usersLeaderboard$.subscribe((leaderboard) => {
      this.leaderboardUsers = leaderboard;
      this.filterUsers();
    });
  }

  toggleTab(tabName: string) {
    this.activeTab = tabName;
    if (this.isInProgressPress) {
      this.isInProgressPress = !this.isInProgressPress;
    } else {
      this.isDonePress = !this.isDonePress;
    }
    this.filterUsers();
  }

  hasUsersInProgress() {
    return this.leaderboardUsers.some((user) => !user.status);
  }

  hasUsersInDone() {
    return this.leaderboardUsers.some((user) => user.status);
  }

  filterUsers() {
    this.usersInProgress = this.leaderboardUsers.filter((user) => user.status === false);
    this.usersInDone = this.leaderboardUsers.filter((user) => user.status === true);
  }
}