import { Component, ViewChild } from '@angular/core';
import { ResourceTableComponent } from './tables/resource-table/resource-table.component';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})

export class ResourcesComponent{ 
  activeTable = 'Tasks';
  selectedTableTasks = 'Tasks';
  selectedTableCourses = 'Courses';
  selectedTableAvatars = 'Avatars';

  @ViewChild(ResourceTableComponent) child!:ResourceTableComponent;

  updateActiveTabTitle(selectedIndex: number): void {
    const tabLabels = ['Tasks', 'Courses', 'Avatars'];
    
    this.activeTable = tabLabels[selectedIndex];
    this.child.loadData();
  }  
}
