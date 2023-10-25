import { Component, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ResourcesService } from '../services/resources.service';
import { MatDialog } from '@angular/material/dialog';
import { TabTitle } from '../enums/tab-title';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent {
  // Tab headers
  activeTabTitle: TabTitle = TabTitle.Tasks;
  showSidenav = false;
  isDialogOpen = false;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private resourcesService: ResourcesService, private dialog: MatDialog) {
 
  }

  updateActiveTabTitle(selectedIndex: number): void {
    const tabLabels = Object.values(TabTitle);
    this.activeTabTitle = tabLabels[selectedIndex];
  }

  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
    this.resourcesService.setSidenavVisibility(this.showSidenav);
  }

}
