import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { UsersRequireAttentionComponent } from './users-require-attention/users-require-attention.component';
import { MatIconModule } from '@angular/material/icon';
import { IconsModule } from 'src/shared/icons-module/icons/icons.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/shared/material-module/material.module';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { LeaderboardListComponent } from './leaderboard-list/leaderboard-list.component';
import { LeaderboardListItemComponent } from './leaderboard-list-item/leaderboard-list-item.component';
import { UsersService } from '../services/users.service';
import { UserProgressTableComponent } from './user-progress-table/user-progress-table.component';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
]


@NgModule({
  declarations: [
    DashboardComponent,
    UsersRequireAttentionComponent,
    LeaderboardComponent,
    LeaderboardListComponent,
    LeaderboardListItemComponent,
    UserProgressTableComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    IconsModule,
    HttpClientModule,
    MatTableModule,
    RouterModule.forChild(routes),
  ],
  providers: [UsersService],
  exports: [DashboardComponent],
})
export class DashboardModule {}