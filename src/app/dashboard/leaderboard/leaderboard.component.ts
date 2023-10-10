import { Component } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent {
  activeTab: string = 'in-progress';
  isInProgressPress = true;
  isDonePress = false;

  toggleTab(tabName: string) {
    this.activeTab = tabName;
    if(this.isInProgressPress) {
      this.isInProgressPress = !this.isInProgressPress;
    } else if(this.isDonePress) {
      this.isDonePress = !this.isDonePress;
    }
  }
}