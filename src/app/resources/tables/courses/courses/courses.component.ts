import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Course } from 'src/app/interfaces/resources/course.model';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ResourcesService } from 'src/app/services/resources.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements AfterViewInit, OnInit {

  dataSource = new MatTableDataSource<Course>;
  columnsToDisplay = ['name', 'link/file', 'fileType', 'length', 'rewards', 'dateAdded', 'lastEdited', 'editedBy', 'options'];

  constructor(private liveAnnouncer:LiveAnnouncer, private resourcesService:ResourcesService) {}

  ngOnInit(): void {
    this.fetchCourses().subscribe(data => {
      this.dataSource.data = data;
    })
  };

  fetchCourses():Observable<Course[]> {
    return this.resourcesService.loadCourses();
  };

  //Sorting
  @ViewChild(MatSort) sort!:MatSort;

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
