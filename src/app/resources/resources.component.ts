import { Component } from '@angular/core';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent{ 

  //tab headers
  activeTabTitle: string = '';

  updateActiveTabTitle(selectedIndex: number): void {
    const tabLabels = ['Tasks', 'Courses', 'Avatars', 'Industries'];
    
    this.activeTabTitle = tabLabels[selectedIndex];
  }

  constructor() {
    this.activeTabTitle = 'Tasks';
  }
}
