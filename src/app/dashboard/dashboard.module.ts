import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { UsersRequireAttentionComponent } from './users-require-attention/users-require-attention.component';
import { IconsModule } from 'src/shared/icons-module/icons/icons.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/shared/material/material.module';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LeaderboardListComponent } from './leaderboard-list/leaderboard-list.component';
import { LeaderboardListItemComponent } from './leaderboard-list-item/leaderboard-list-item.component';
import { UserProgressTableComponent } from './user-progress-table/user-progress-table.component';
import { LeaderboardTableComponent } from './leaderboard-table/leaderboard-table.component';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { CurrentProgressComponent } from './current-progress/current-progress.component';
import { UsersService } from '../services/users/users.service';
import { GoogleChartsModule } from 'angular-google-charts';
import { UsersRequireAttentionTableComponent } from './users-require-attention/users-require-attention-table/users-require-attention-table.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'leaderboard-table',
    component: LeaderboardTableComponent,
  },
  {
    path: 'users-require-attention-table',
    component: UsersRequireAttentionTableComponent,
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    UsersRequireAttentionComponent,
    LeaderboardListComponent,
    LeaderboardListItemComponent,
    UserProgressTableComponent,
    LeaderboardTableComponent,
    CurrentProgressComponent,
    LeaderboardComponent,
    UsersRequireAttentionTableComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    IconsModule,
    HttpClientModule,
    MatTableModule,
    RouterModule.forChild(routes),
    GoogleChartsModule.forRoot(),
  ],
  providers: [UsersService],
  exports: [DashboardComponent],
})
export class DashboardModule {}
