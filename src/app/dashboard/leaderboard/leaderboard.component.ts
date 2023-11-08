import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { UserCard } from 'src/app/interfaces/users/user-card.model';
import { LeaderboardTabsEnum } from '../../enums/leaderboard-tabs.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  activeTab: LeaderboardTabsEnum = LeaderboardTabsEnum.InProgress;
  usersInProgress: UserCard[] = [];
  usersInDone: UserCard[] = [];
  leaderboardTabsEnum = LeaderboardTabsEnum;
  screenHeight: number;

  maxUsersToShow: number;

  constructor(private userService: UsersService, private router: Router) {
    this.screenHeight = window.innerHeight;
    if (this.screenHeight >= 960) {
      this.maxUsersToShow = 14;
    } else if (this.screenHeight >= 752) {
      this.maxUsersToShow = 10;
    } else this.maxUsersToShow = 7;
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsersAPI().subscribe((data: any) => {
      const users: UserCard[] = data.users.map((user: any) => ({
        name: user.name,
        status: user.totalTasks - user.completedTasks === 0,
        totalTasks: user.totalTasks,
        completedTasks: user.completedTasks,
        points: user.score,
        rank: user.rank,
      }));
  
      this.usersInProgress = this.sortAndFilterUsers(users, false);
      this.usersInDone = this.sortAndFilterUsers(users, true);
    });
  }

  private sortAndFilterUsers(users: UserCard[], status: boolean): UserCard[] {
    return users.filter((user) => user.status === status).slice(0, this.maxUsersToShow).sort((a, b) => a.rank - b.rank);
  }

  viewAllUsers(): void {
    this.router.navigate(['/main-page/leaderboard-table']);
  }
}