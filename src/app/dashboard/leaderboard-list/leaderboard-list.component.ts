import { Component, Input } from '@angular/core';
import { UserCard } from 'src/app/interfaces/users/user-card.model';

@Component({
  selector: 'app-leaderboard-list',
  templateUrl: './leaderboard-list.component.html',
  styleUrls: ['./leaderboard-list.component.scss']
})
export class LeaderboardListComponent {
  @Input() leaderboardUsers: UserCard[] = [];

  constructor() {}
}
