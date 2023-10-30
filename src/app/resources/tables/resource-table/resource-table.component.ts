import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ResourceTableAvatars, ResourceTableCourses, ResourceTableTasks } from 'src/app/enums/resource-table';
import { TabTitle } from 'src/app/enums/tab-title';
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
  @Input() dataSourceTask!: MatTableDataSource<Task>;
  @Input() dataSourceCourse!: MatTableDataSource<Course>;
  @Input() dataSourceAvatar!: MatTableDataSource<Avatar>;

  @ViewChild(MatSort) sortTasks!:MatSort;
  @ViewChild(MatSort) sortCourses!:MatSort;
  @ViewChild(MatSort) sortAvatars!:MatSort;

  tableTasks = TabTitle.Tasks;
  tableCourses = TabTitle.Courses;
  tableAvatars = TabTitle.Avatars;
  
  columnsToDisplayTasks = this.parseEnumToArray(ResourceTableTasks);
  columnsToDisplayCourses = this.parseEnumToArray(ResourceTableCourses);
  columnsToDisplayAvatars = this.parseEnumToArray(ResourceTableAvatars);

  constructor(private liveAnnouncer: LiveAnnouncer, private resourcesService: ResourcesService) {}

  parseEnumToArray(enumObject: any) {
    return Object.values(enumObject).filter(value => isNaN(Number(value)));
  }

  //Sorting
  ngAfterViewInit(): void {
    this.dataSourceTask.sort = this.sortTasks;
    this.dataSourceCourse.sort = this.sortCourses;
    this.dataSourceAvatar.sort = this.sortAvatars;
  };

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  };
}
