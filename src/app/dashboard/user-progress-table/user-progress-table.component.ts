import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { UsersProgressService } from '../../services/users-progress/user-progress.service';
import { MatPaginator } from '@angular/material/paginator';
import { UsersProgressTable } from '../../interfaces/user-pogress-model';
import { Router } from '@angular/router';
import { displayedColumns} from './table-config';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-user-progress-table',
  templateUrl: './user-progress-table.component.html',
  styleUrls: ['./user-progress-table.component.scss']
})

export class UserProgressTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  totalCourses = 15;
  dataSource = new MatTableDataSource<UsersProgressTable>();
  allUsersProgress: UsersProgressTable[] = [];

  columnsToDisplay = displayedColumns;
  rowsToDisplay!: number;

  screenHeight: number;

  constructor(private userService: UsersProgressService, private liveAnnouncer: LiveAnnouncer, private router: Router) {
    this.screenHeight = window.innerHeight;
  }

  ngOnInit(): void {
    this.filterAllUsers();
    console.log(this.rowsToDisplay);
  };

  filterAllUsers(): void {
    this.userService.getAllUsers().subscribe((values: UsersProgressTable[]) => {
      this.rowsToDisplay = values.length;
      if(this.screenHeight > 900) {
        this.dataSource.data = values.slice(0, 11);
        this.rowsToDisplay = values.slice(0, 11).length;
      } else if(this.screenHeight > 700) {
        this.dataSource.data = values.slice(0, 6);
        this.rowsToDisplay = values.slice(0, 6).length;
      } else this.dataSource.data = values.slice(0, 4);
      this.allUsersProgress=values;
    });
  };

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  };

  viewAllUsers(): void {
    this.router.navigate(['users']);
  };

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  };
}
