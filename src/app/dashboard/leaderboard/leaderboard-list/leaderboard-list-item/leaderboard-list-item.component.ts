import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { UserCard } from 'src/app/interfaces/user-card.model';

@Component({
  selector: 'app-leaderboard-list-item',
  templateUrl: './leaderboard-list-item.component.html',
  styleUrls: ['./leaderboard-list-item.component.scss']
})
export class LeaderboardListItemComponent implements OnInit {
  leaderboardUsers: UserCard[] = [];

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.leaderboardUsers = this.userService.getUsersLeaderboard();
  }
}
