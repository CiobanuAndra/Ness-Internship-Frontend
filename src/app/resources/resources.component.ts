import { Component, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent {
  // Tab headers
  activeTabTitle: string = '';
  showSidenav = false;

  updateActiveTabTitle(selectedIndex: number): void {
    const tabLabels = ['Tasks', 'Courses', 'Avatars', 'Industries'];

    this.activeTabTitle = tabLabels[selectedIndex];
  }


  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
 
    this.activeTabTitle = 'Tasks';
  }

  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
  }

}
