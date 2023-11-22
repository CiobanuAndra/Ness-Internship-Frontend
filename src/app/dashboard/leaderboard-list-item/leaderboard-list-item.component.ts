import { Component, Input, OnInit } from '@angular/core';
import { LeaderboardTabsEnum } from 'src/app/enums/leaderboard-tabs.enum';
import { UserCard } from 'src/app/interfaces/users/user-card.model';

@Component({
  selector: 'app-leaderboard-list-item',
  templateUrl: './leaderboard-list-item.component.html',
  styleUrls: ['./leaderboard-list-item.component.scss'],
})
export class LeaderboardListItemComponent{
  @Input() user!: UserCard;
  @Input() status!: number;
  @Input() currentUsersNumberProgress!: any;
  @Input() currentUsersNumberDone!: any;
  @Input() activeTab!:LeaderboardTabsEnum;
  
  leaderboardTabsEnumProgress = LeaderboardTabsEnum.InProgress;
  leaderboardTabsEnumDone = LeaderboardTabsEnum.Done;

  screenHeight: number;
  screenBigger: boolean;

  constructor() {
    this.screenHeight = window.innerHeight;
    this.screenHeight >= 960? this.screenBigger = true: this.screenBigger = false;
  }

  getConditionalStyles(): { [key: string]: string } {
    if (this.activeTab === this.leaderboardTabsEnumProgress) {
      console.log(this.currentUsersNumberProgress.length)
      return {'height': this.getHeightStyle(this.currentUsersNumberProgress.length)};
    }
    if (this.activeTab === this.leaderboardTabsEnumDone) {
      console.log(this.currentUsersNumberDone.length)
      return {'height': this.getHeightStyle(this.currentUsersNumberDone.length)};
    } else {
      return {};
    }
  };

  getHeightStyle(parameter: any): string {
    if (this.screenBigger) {
      return 'calc(88.5% / ' + [parameter] + ')';
    } else {
      return 'calc(84.6% / ' + [parameter] + ')';
    }
  };
}