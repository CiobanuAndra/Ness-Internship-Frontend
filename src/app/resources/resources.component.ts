import { Component, OnInit, ViewChild } from '@angular/core';
import { ResourcesService } from '../services/resources/resources.service';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../interfaces/resources/task.model';
import { Avatar } from '../interfaces/resources/avatar.model';
import { Course } from '../interfaces/resources/course.model';
import { tabTitle } from '../enums/tab-title';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnInit {
  activeTable = 'Tasks';
  showSidenav = false;
  isDialogOpen = false;
  private destroy$ = new Subject<void>();

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
  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
    this.resourcesService.setSidenavVisibility(this.showSidenav);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
