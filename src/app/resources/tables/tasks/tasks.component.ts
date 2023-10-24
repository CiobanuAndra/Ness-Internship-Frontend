import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { Task } from 'src/app/interfaces/resources/task.model';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ResourcesService } from 'src/app/services/resources/resources.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements AfterViewInit, OnInit {

  dataSource = new MatTableDataSource<Task>();
  columnsToDisplay = ['icon', 'name', 'type', 'courses', 'order', 'length', 'rewards', 'dateAdded', 'lastEdited', 'editedBy', 'options'];

  constructor(private liveAnnouncer: LiveAnnouncer, private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.fetchTasks().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  fetchTasks(): Observable<Task[]> {
    return this.resourcesService.loadTasks();
  };

  //Sorting
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  };

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  };
}