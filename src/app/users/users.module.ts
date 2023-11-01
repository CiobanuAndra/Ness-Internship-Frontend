import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/shared/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { AddbulkusersComponent } from './modals/addbulkusers/addbulkusers/addbulkusers.component';
import { AddBulkUsersComponent } from './sidenavs/add-bulk-users/add-bulk-users.component';
import { AddnewuserComponent } from './asides/addnewuser/addnewuser/addnewuser.component';
import { AddbulkuserTableComponent } from './modals/addbulkusers/addbulkusers/tables/addbulkuser-table/addbulkuser-table.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
]

@NgModule({
  declarations: [
    UsersComponent,
    AddbulkusersComponent,
    AddnewuserComponent,
    AddbulkuserTableComponent,
    AddBulkUsersComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  exports: [ UsersComponent ],
})
export class UsersModule {}
