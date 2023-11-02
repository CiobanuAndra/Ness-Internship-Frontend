import { NgModule, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in/log-in.component';
import { RouterModule, Routes } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';

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
    MatCardModule,
    MatInputModule,
    RouterModule.forChild(routes),
  ],
  // providers: [UsersService],
  exports: [LogInComponent],
})
export class LogInModule implements OnInit{ 
  // @Input('changedNavbar') navbar: NavbarComponent;
  // public changeNavbar(){
  //   this.navbar.show=false;
  // }
  ngOnInit(): void {
    
  }
}
