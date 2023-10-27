import { NgModule, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in/log-in.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    component: LogInComponent,
  },
];


@NgModule({
  declarations: [
    LogInComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  // providers: [UsersService],
  exports: [LogInComponent],
})
export class LogInModule{ 
  // @Input navbar: NavbarComponent;

}
