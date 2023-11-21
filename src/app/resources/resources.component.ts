import { Component, OnInit, ViewChild } from '@angular/core';
import { ResourcesService } from '../services/resources/resources.service';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../interfaces/resources/task.model';
import { Avatar } from '../interfaces/resources/avatar.model';
import { Course } from '../interfaces/resources/course.model';
import { tabTitle } from '../enums/tab-title';
import { BehaviorSubject, Observable } from 'rxjs';
 
@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnInit {
  activeTable = 'Tasks';
  showSidenav = false;
  showAddTask = false;
  showAddAvatar = false;

  selectedTableTasks = tabTitle.tasks;
  selectedTableCourses = tabTitle.courses;
  selectedTableAvatars = tabTitle.avatars;
  selectedTableIndustries = tabTitle.industries;

  dataSourceTasks = new MatTableDataSource<Task>();
  dataSourceCourses = new MatTableDataSource<Course>();
  dataSourceAvatars = new MatTableDataSource<Avatar>();

  constructor(private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.loadData();
    this.subscribeToAvatars();
  }

  subscribeToAvatars(): void {
    this.resourcesService.avatarsSubject.subscribe((avatars) => {
      if (Array.isArray(avatars)) {
        const currentAvatars = this.dataSourceAvatars.data || [];
        this.dataSourceAvatars.data = [...currentAvatars, ...avatars];
      }
    });
  }
  

  loadData(): void {
    this.fetchDataTasks();
    this.fetchDataCourses();
    this.fetchDataAvatars();
  }

  fetchDataTasks(): void {
    this.resourcesService.getTasks(0).subscribe((data: Task[]) => {
      this.dataSourceTasks.data = data;
    });
  }

  fetchDataCourses(): void {
    this.resourcesService.getCourses(0).subscribe((data: any) => {
      if (data && data.content && Array.isArray(data.content)) {
        this.dataSourceCourses.data = data.content;
      }
    });
  }

  fetchDataAvatars(): void {
    this.resourcesService.getAvatars().subscribe((data: any) => {
      if (data && data.content && Array.isArray(data.content)) {
        this.dataSourceAvatars.data = data.content;
      }
    });
  }
  

  parseEnumToArray(enumObject: any) {
    return Object.values(enumObject).filter((value) => isNaN(Number(value)));
  }

  updateActiveTabTitle(selectedIndex: number): void {
    const tabLabels: string[] = this.parseEnumToArray(tabTitle) as string[];
    this.activeTable = tabLabels[selectedIndex];
    this.loadData();
  }

  toggleSidenav(type: string): void {
    if (type === 'task') {
      this.showAddTask = true;
      this.showAddAvatar = false;
    } else if (type === 'avatar') {
      this.showAddAvatar = true;
      this.showAddTask = false;
    }

    this.showSidenav = true;
    this.resourcesService.setSidenavVisibility(this.showSidenav);
  }

  closeDialog(type: string): void {
    if (type === 'task') {
      this.showAddTask = false;
    } else if (type === 'avatar') {
      this.showAddAvatar = false;
    }

    this.showSidenav = false;
    this.resourcesService.setSidenavVisibility(this.showSidenav);
  }
  
  
}
