import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBluckUsersComponent } from './users/sidenavs/add-bluck-users/add-bluck-users.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'resources',
    loadChildren: () =>
      import('./resources/resources.module').then((m) => m.ResourcesModule),
  },
  {
    path: 'add-bluck-users',
    component: AddBluckUsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
