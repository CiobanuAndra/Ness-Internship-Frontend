import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from '../users.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/shared/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { IconsModule } from 'src/shared/icons-module/icons/icons.module';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavService } from '../sidenavs/add-bluck-users/service/sidenav.service';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    MatTabsModule,
    HttpClientModule,
    MatTableModule,
    IconsModule,
    MatSortModule,
    MatPaginatorModule,
    MatSidenavModule,
  ],
  exports: [UsersComponent],
  providers: [DatePipe, SidenavService],
})
export class UsersModule {}
