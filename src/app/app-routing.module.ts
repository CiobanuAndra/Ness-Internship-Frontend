import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavbarLayoutComponent} from './navbar/navbar-layout.component';
import { UsersRequireAttentionTableComponent } from './dashboard/users-require-attention/users-require-attention-table/users-require-attention-table.component'
import {LeaderboardTableComponent} from './dashboard/leaderboard-table/leaderboard-table.component';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./log-in/log-in.module').then((m) => m.LogInModule),
  },
  {
    path: 'dashboard',
    component: NavbarLayoutComponent,
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'users',
    component: NavbarLayoutComponent,
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'resources',
    component: NavbarLayoutComponent,
    loadChildren: () =>
      import('./resources/resources.module').then((m) => m.ResourcesModule),
  },
  {
    path: 'users-require-attention-table',
    component: NavbarLayoutComponent,
    children:[
      {
        path: '',
        component: UsersRequireAttentionTableComponent,
      },
    ]
  },
  {
    path: 'leaderboard-table',
    component: NavbarLayoutComponent,
    children:[
      {
        path: '',
        component: LeaderboardTableComponent,
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
