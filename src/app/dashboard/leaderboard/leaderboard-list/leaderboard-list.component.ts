import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { UserCard } from 'src/app/interfaces/user-card.model';

@Component({
  selector: 'app-leaderboard-list',
  templateUrl: './leaderboard-list.component.html',
  styleUrls: ['./leaderboard-list.component.scss']
})
export class LeaderboardListComponent implements OnInit {
  @Input() status!: number;
  leaderboardUsers: UserCard[] = [];

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.loadLeaderboardUsers();
  }

  loadLeaderboardUsers() {
    const allUsers = this.userService.getUsersLeaderboard();

    if (this.status === 0) {
      this.leaderboardUsers = allUsers.filter(user => !user.status);
    } else if (this.status === 1) {
      this.leaderboardUsers = allUsers.filter(user => user.status);
    }
  }
}
