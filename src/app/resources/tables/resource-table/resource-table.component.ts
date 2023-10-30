import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ResourceTableAvatars, ResourceTableCourses, ResourceTableTasks } from 'src/app/enums/resource-table';
import { tabTitle } from 'src/app/enums/tab-title';
import { ResourcesService } from 'src/app/services/resources/resources.service';

@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.scss']
})
export class ResourceTableComponent {
  @ViewChild(MatSort) sortTasks!:MatSort;
  @ViewChild(MatSort) sortCourses!:MatSort;
  @ViewChild(MatSort) sortAvatars!:MatSort;

  @Input() selectedTable = '';
  @Input() dataSource!: MatTableDataSource<any>;

  tableTasks = tabTitle.tasks;
  tableCourses = tabTitle.courses;
  tableAvatars = tabTitle.avatars;
  
  columnsToDisplayTasks = this.parseEnumToArray(ResourceTableTasks);
  columnsToDisplayCourses = this.parseEnumToArray(ResourceTableCourses);
  columnsToDisplayAvatars = this.parseEnumToArray(ResourceTableAvatars);

  constructor(private liveAnnouncer: LiveAnnouncer, private resourcesService: ResourcesService) {}

  parseEnumToArray(enumObject: any) {
    return Object.values(enumObject).filter(value => isNaN(Number(value)));
  }

  //Sorting
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sortTasks;
    this.dataSource.sort = this.sortCourses;
    this.dataSource.sort = this.sortAvatars;
  };

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  };
}
