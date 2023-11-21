import { Component, Input, OnInit } from '@angular/core';
import { UserCard } from 'src/app/interfaces/users/user-card.model';

@Component({
  selector: 'app-leaderboard-list-item',
  templateUrl: './leaderboard-list-item.component.html',
  styleUrls: ['./leaderboard-list-item.component.scss'],
})
export class LeaderboardListItemComponent{
  @Input() user!: UserCard;
  @Input() status!: number;
  @Input() currentUsersNumber!: any;

  screenHeight: number;
  screenBigger: boolean;

  constructor() {
    this.screenHeight = window.innerHeight;
    this.screenHeight >= 960? this.screenBigger = true: this.screenBigger = false;
  }

  getHeightStyle(): string {
    if (!this.currentUsersNumber) return '';
    if (this.screenBigger) {
      return 'calc(88.5% / ' + this.currentUsersNumber.length + ')';
    } else {
      return 'calc(84.6% / ' + this.currentUsersNumber.length + ')';
    }
  }
}