import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { UsersRoutingModule } from './users-routing.module';
import { MaterialModule } from 'src/shared/material-module/material.module';
import { UsersComponent } from '../users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, UsersRoutingModule, MaterialModule, MatTabsModule],
  exports: [UsersComponent],
})
export class UsersModule {}
