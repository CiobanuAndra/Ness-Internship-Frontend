import { Component, Input } from '@angular/core';
import { UserCard } from 'src/app/interfaces/users/user-card.model';

@Component({
  selector: 'app-leaderboard-list-item',
  templateUrl: './leaderboard-list-item.component.html',
  styleUrls: ['./leaderboard-list-item.component.scss'],
})
export class LeaderboardListItemComponent {
  @Input() user!: UserCard;
  @Input() status!: number;

  constructor() {}
}