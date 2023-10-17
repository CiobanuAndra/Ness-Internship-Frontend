import { Component, Input, OnInit } from '@angular/core';
import { UserCard } from 'src/app/interfaces/user-card.model';

@Component({
  selector: 'app-leaderboard-list',
  templateUrl: './leaderboard-list.component.html',
  styleUrls: ['./leaderboard-list.component.scss']
})
export class LeaderboardListComponent implements OnInit {
  @Input() leaderboardUsers: UserCard[] = [];
  constructor() {}

  ngOnInit() {
  }
}