import { Component, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
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
  // Tab headers
  activeTable = 'Tasks';
  showSidenav = false;
  isDialogOpen = false;

  selectedTableTasks = 'Tasks';
  selectedTableCourses = 'Courses';
  selectedTableAvatars = 'Avatars';

  @ViewChild(ResourceTableComponent) child!:ResourceTableComponent;
 
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private resourcesService: ResourcesService, private dialog: MatDialog) {}
 
  parseEnumToArray(enumObject: any) {
    return Object.values(enumObject).filter(value => isNaN(Number(value)));
  }

  updateActiveTabTitle(selectedIndex: number): void {
    const tabLabels: string[] = this.parseEnumToArray(TabTitle) as string[];
    console.log(tabLabels);
    this.activeTable = tabLabels[selectedIndex];
    this.child.loadData();
  };
 
  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
    this.resourcesService.setSidenavVisibility(this.showSidenav);
  };
}



