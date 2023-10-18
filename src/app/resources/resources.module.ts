import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/shared/material/material.module';
import { TasksComponent } from './tables/tasks/tasks/tasks.component';
import { CoursesComponent } from './tables/courses/courses/courses.component';
import { AvatarsComponent } from './tables/avatars/avatars/avatars.component';
import { IndustriesComponent } from './tables/industries/industries/industries.component';
import { ResourcesComponent } from './resources.component';

const routes: Routes = [
  {
    path: '',
    component: ResourcesComponent,
  },
]

@NgModule({
  declarations: [
    ResourcesComponent,
    TasksComponent,
    CoursesComponent,
    AvatarsComponent,
    IndustriesComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports:[ResourcesComponent]
})

export class ResourcesModule { }
