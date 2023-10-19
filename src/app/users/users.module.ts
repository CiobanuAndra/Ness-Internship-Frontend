import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/shared/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { AddbulkusersComponent } from './modals/addbulkusers/addbulkusers/addbulkusers.component';
import { RequireattentionComponent } from './modals/addbulkusers/addbulkusers/tables/requireattentions/requireattention/requireattention.component';
import { AwaitconfirmationComponent } from './modals/addbulkusers/addbulkusers/tables/awaitconfirmation/awaitconfirmation/awaitconfirmation.component';

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
    RequireattentionComponent,
    AwaitconfirmationComponent,
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
