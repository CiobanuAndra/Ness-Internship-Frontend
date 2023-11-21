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
import { MultipleTaskComponent } from './tables/multiple-task/multiple-task.component';
import { SingleTaskComponent } from './tables/single-task/single-task.component';
import { ResourceTableComponent } from './tables/resource-table/resource-table.component';
import { AddTaskComponent } from './tables/add-task/add-task.component';
import { RewardSingleTaskComponent } from './tables/reward-single-task/reward-single-task.component';
import { MatInputModule } from '@angular/material/input';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { RewardMultipleTaskComponent } from './tables/reward-multiple-task/reward-multiple-task.component';
import { AddAvatarComponent } from './tables/add-avatar/add-avatar.component';

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
    AddTaskComponent,
    MultipleTaskComponent,
    SingleTaskComponent,
    RewardSingleTaskComponent,
    RewardMultipleTaskComponent,
    AddAvatarComponent,
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
    MatInputModule,
    NgxMatFileInputModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [ResourcesComponent]
})

export class ResourcesModule { }
