import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { UsersRequireAttentionComponent } from './users-require-attention/users-require-attention.component';
import { MatIconModule } from '@angular/material/icon';
import { IconsModule } from 'src/shared/icons-module/icons/icons.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/shared/material-module/material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardComponent, UsersRequireAttentionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatIconModule,
    IconsModule,
    HttpClientModule,
    DashboardRoutingModule
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
