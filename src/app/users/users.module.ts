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
import { IconsModule } from 'src/shared/icons-module/icons/icons.module';
import { NgxMatFileInputModule } from 'node_modules/@angular-material-components/file-input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatConfirmDialogComponent } from './dialog/mat-confirm-dialog/mat-confirm-dialog.component';
import { EdituserComponent } from './modals/addbulkusers/addbulkusers/edituser/edituser.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
];

@NgModule({
  declarations: [
    UsersComponent,
    AddbulkusersComponent,
    AddnewuserComponent,
    AddbulkuserTableComponent,
    AddBulkUsersComponent,
    MatConfirmDialogComponent,
    EdituserComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconsModule,
    MaterialModule,
    HttpClientModule,
    NgxMatFileInputModule,
    RouterModule.forChild(routes),
  ],
  exports: [UsersComponent, AddBulkUsersComponent],
})
export class UsersModule {}
