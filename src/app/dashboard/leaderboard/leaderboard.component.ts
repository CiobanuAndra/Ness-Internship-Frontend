import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  activeTab: string = 'in-progress';
  isInProgressPress = true;
  isDonePress = false;
  leaderboardUsers: any[] = [];

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.leaderboardUsers = this.userService.getUsersLeaderboard();
  }

  toggleTab(tabName: string) {
    this.activeTab = tabName;
    if (this.isInProgressPress) {
      this.isInProgressPress = !this.isInProgressPress;
    } else {
      this.isDonePress = !this.isDonePress;
    }
  }

  hasUsersInProgress() {
    return this.leaderboardUsers.some(user => !user.status);
  }

  hasUsersInDone() {
    return this.leaderboardUsers.some(user => user.status);
  }
}
