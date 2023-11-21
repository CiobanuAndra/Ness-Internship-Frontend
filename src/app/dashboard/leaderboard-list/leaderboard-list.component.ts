import { Component, Input, OnInit } from '@angular/core';
import { LeaderboardTabsEnum } from 'src/app/enums/leaderboard-tabs.enum';
import { UserCard } from 'src/app/interfaces/users/user-card.model';

@Component({
  selector: 'app-leaderboard-list',
  templateUrl: './leaderboard-list.component.html',
  styleUrls: ['./leaderboard-list.component.scss']
})
export class LeaderboardListComponent implements OnInit {
  @Input() leaderboardUsers: UserCard[] = [];
  @Input() currentUsersNumberProgress!: number;
  @Input() currentUsersNumberDone!: number;
  @Input() activeTab!:LeaderboardTabsEnum;
  leaderboardTabsEnumProgress = LeaderboardTabsEnum.InProgress;
  leaderboardTabsEnumDone = LeaderboardTabsEnum.Done;

  constructor() {}

  ngOnInit() {
  }
}
