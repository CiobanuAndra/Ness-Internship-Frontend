import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/shared/material/material.module';
import { ResourcesComponent } from './resources.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { ResourceTableComponent } from './tables/resource-table/resource-table.component';

const routes: Routes = [
  {
    path: '',
    component: ResourcesComponent,
  },
];

@NgModule({
  declarations: [
    ResourcesComponent,
    ResourceTableComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatStepperModule,
    FormsModule,
    NgIf,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgFor,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [ResourcesComponent]
})

export class ResourcesModule { }
