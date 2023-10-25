import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ResourceTableAvatars, ResourceTableCourses, ResourceTableTasks } from 'src/app/enums/resource-table';
import { Avatar } from 'src/app/interfaces/resources/avatar.model';
import { Course } from 'src/app/interfaces/resources/course.model';
import { Task } from 'src/app/interfaces/resources/task.model';
import { ResourcesService } from 'src/app/services/resources/resources.service';

@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.scss']
})
export class ResourceTableComponent {
  @Input() selectedTable = '';

  dataSourceTasks = new MatTableDataSource<Task>;
  dataSourceCourses = new MatTableDataSource<Course>;
  dataSourceAvatars = new MatTableDataSource<Avatar>;
  
  columnsToDisplayTasks = this.parseEnumToArray(ResourceTableTasks);
  columnsToDisplayCourses = this.parseEnumToArray(ResourceTableCourses);
  columnsToDisplayAvatars = this.parseEnumToArray(ResourceTableAvatars);

  parseEnumToArray(enumObject: any) {
    return Object.values(enumObject).filter(value => isNaN(Number(value)));
  }

  constructor(private liveAnnouncer: LiveAnnouncer, private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.loadData();
  };

  loadData(): void {
    if (this.selectedTable === 'Tasks') {
      console.log(this.selectedTable);
      this.fetchTasks().subscribe(data => {
        this.dataSourceTasks.data = data;
      });
    } else if (this.selectedTable === 'Courses') {
      console.log(this.selectedTable);
      this.fetchCourses().subscribe(data => {
        this.dataSourceCourses.data = data;
      });
    } else if (this.selectedTable === 'Avatars') {
      console.log(this.selectedTable);
      this.fetchAvatars().subscribe(data => {
        this.dataSourceAvatars.data = data;
      });
    }
  }

  fetchTasks():Observable<Task[]> {
    return this.resourcesService.loadTasks();
  };

  fetchCourses():Observable<Course[]> {
    return this.resourcesService.loadCourses();
  };
  
  fetchAvatars():Observable<Avatar[]> {
    return this.resourcesService.loadAvatars();
  };

  //Sorting
  @ViewChild(MatSort) sortTasks!:MatSort;
  @ViewChild(MatSort) sortCourses!:MatSort;
  @ViewChild(MatSort) sortAvatars!:MatSort;

  ngAfterViewInit(): void {
    this.dataSourceTasks.sort = this.sortTasks;
    this.dataSourceCourses.sort = this.sortCourses;
    this.dataSourceAvatars.sort = this.sortAvatars;
  };

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  };
}
