import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

import { UsersRequireAttentionTableComponent } from './dashboard/users-require-attention/users-require-attention-table/users-require-attention-table.component'
import { LeaderboardTableComponent } from './dashboard/leaderboard-table/leaderboard-table.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./log-in/log-in.module').then((m) => m.LogInModule),
  },
  {
    path: 'main-page',
    component: NavbarComponent,
    children:[
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'resources',
        loadChildren: () =>
          import('./resources/resources.module').then((m) => m.ResourcesModule),
      },
      {
        path: 'users-require-attention-table',
        component:UsersRequireAttentionTableComponent,
      },
      {
        path: 'leaderboard-table',
        component:LeaderboardTableComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
