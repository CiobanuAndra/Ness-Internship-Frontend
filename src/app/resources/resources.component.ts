import { Component, ViewChild } from '@angular/core';
import { ResourcesService } from '../services/resources/resources.service';
import { MatDialog } from '@angular/material/dialog';
import { TabTitle } from '../enums/tab-title';
import { ResourceTableComponent } from './tables/resource-table/resource-table.component';
 
@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent {
  @ViewChild(ResourceTableComponent) child!:ResourceTableComponent;

  activeTable = 'Tasks';
  showSidenav = false;
  isDialogOpen = false;

  selectedTableTasks = TabTitle.Tasks;
  selectedTableCourses = TabTitle.Courses;
  selectedTableAvatars = TabTitle.Avatars;

  constructor(private resourcesService: ResourcesService) {}
 
  parseEnumToArray(enumObject: any) {
    return Object.values(enumObject).filter(value => isNaN(Number(value)));
  }

  updateActiveTabTitle(selectedIndex: number): void {
    const tabLabels: string[] = this.parseEnumToArray(TabTitle) as string[];
    this.activeTable = tabLabels[selectedIndex];
    this.child.loadData();
  };
 
  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
    this.resourcesService.setSidenavVisibility(this.showSidenav);
  };
}



