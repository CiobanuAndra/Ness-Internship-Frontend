import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from '../users.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/shared/material/material.module';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    MatTabsModule,
    HttpClientModule,
    MatTableModule,
  ],
  exports: [UsersComponent],
})
export class UsersModule {}
