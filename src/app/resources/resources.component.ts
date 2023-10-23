import { Component, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ResourcesService } from '../services/resources.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent {
  // Tab headers
  
  activeTabTitle: string = '';
  showSidenav = false;
  isDialogOpen = false;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private resourcesService: ResourcesService, private dialog: MatDialog) {
 
    this.activeTabTitle = 'Tasks';
  }

  updateActiveTabTitle(selectedIndex: number): void {
    const tabLabels = ['Tasks', 'Courses', 'Avatars', 'Industries'];
    this.activeTabTitle = tabLabels[selectedIndex];
  }

  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
    this.resourcesService.setSidenavVisibility(this.showSidenav);
  }

}
