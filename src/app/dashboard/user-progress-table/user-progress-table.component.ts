import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UsersProgressService } from '../../services/users-progress/user-progress.service';
import { UsersFilter } from '../../enums/users-filter';
import { MatPaginator } from '@angular/material/paginator';
import { UsersProgressTable } from '../../interfaces/user-pogress-model';
import { Router } from '@angular/router';
import { displayedColumns} from './table-config';


@Component({
  selector: 'app-user-progress-table',
  templateUrl: './user-progress-table.component.html',
  styleUrls: ['./user-progress-table.component.scss']
})

export class UserProgressTableComponent implements AfterViewInit, OnInit {


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UsersProgressService, private router: Router) {}

  totalCourses = 15;
  dataSource = new MatTableDataSource<UsersProgressTable>();
  allUsersProgress:UsersProgressTable[]=[];

  displayedColumns:string[]= displayedColumns;

  filterAllUsers(): void {
    this.userService.getAllUsers().subscribe((values: UsersProgressTable[]) => {
      this.dataSource.data = values.slice(0, 11);
      this.allUsersProgress=values;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  viewAllUsers(): void {
    this.router.navigate(['users']);
  }
  ngOnInit(): void {
    this.filterAllUsers();
  }
}
