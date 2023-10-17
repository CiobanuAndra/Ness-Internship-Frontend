import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { MatIconModule } from '@angular/material/icon';
import { IconsModule } from 'src/shared/icons-module/icons/icons.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/shared/material-module/material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
]

@NgModule({
  declarations: [
    UsersComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    IconsModule,
    HttpClientModule,
    MatTableModule,
    RouterModule.forChild(routes),
  ],
  exports: [ UsersComponent ],
})
export class UsersModule {}
