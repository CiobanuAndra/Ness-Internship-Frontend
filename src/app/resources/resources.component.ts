import { Component, OnInit, ViewChild } from '@angular/core';
import { ResourcesService } from '../services/resources/resources.service';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../interfaces/resources/task.model';
import { Avatar } from '../interfaces/resources/avatar.model';
import { Course } from '../interfaces/resources/course.model';
import { tabTitle } from '../enums/tab-title';
 
@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit{
  activeTable = 'Tasks';
  showSidenav = false;
  isDialogOpen = false;

  selectedTableTasks = tabTitle.tasks;
  selectedTableCourses = tabTitle.courses;
  selectedTableAvatars = tabTitle.avatars;
  selectedTableIndustries = tabTitle.industries;

  dataSourceTasks = new MatTableDataSource<Task>;
  dataSourceCourses = new MatTableDataSource<Course>;
  dataSourceAvatars = new MatTableDataSource<Avatar>;

  constructor(private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.loadData();
  }
 
  loadData(): void {
    this.fetchDataTasks();
    this.fetchDataCourse();
    this.fetchDataAvatars();
  }

  //fetch data for tables
  fetchDataTasks(): void {
    this.resourcesService.loadTasks().subscribe(data => {
      this.dataSourceTasks.data = data;
    })
  }

  fetchDataCourse(): void {
    this.resourcesService.loadCourses().subscribe(data => {
      this.dataSourceCourses.data = data;
    })
  }

  fetchDataAvatars(): void {
    this.resourcesService.loadAvatars().subscribe(data => {
      this.dataSourceAvatars.data = data;
    })
  }

  parseEnumToArray(enumObject: any) {
    return Object.values(enumObject).filter(value => isNaN(Number(value)));
  }

  updateActiveTabTitle(selectedIndex: number): void {
    const tabLabels: string[] = this.parseEnumToArray(tabTitle) as string[];
    this.activeTable = tabLabels[selectedIndex];
    this.loadData();
  };
 
  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
    this.resourcesService.setSidenavVisibility(this.showSidenav);
  };
}



