import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { UserRequireAttention } from 'src/app/interfaces/user-require-attention.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-require-attention-table',
  templateUrl: './users-require-attention-table.component.html',
  styleUrls: ['./users-require-attention-table.component.scss'],
})
export class UsersRequireAttentionTableComponent implements AfterViewInit {
  constructor(private usersService: UsersService) {}

  totalCourses: number = 0;
  displayedColumns: string[] = ['name', 'tasksLeft', 'timeLeft', 'buttons'];
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<UserRequireAttention>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filterActiveUsers(): void {
    this.usersService
      .filterActiveUsersRequireAttention()
      .subscribe((values) => {
        this.dataSource.data = values;
      });
  }

  filterInactiveUsers(): void {
    this.usersService
      .filterInactiveUsersRequireAttention()
      .subscribe((values) => {
        this.dataSource.data = values;
      });
  }

  onTabChange(event: MatTabChangeEvent): void {
    switch (event.index) {
      case 0:
        this.filterActiveUsers();
        break;
      case 1:
        this.filterInactiveUsers();
        break;

      default:
        break;
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.usersService.getUsersRequireAttention().subscribe((values) => {
      this.dataSource.data = values;
    });
    this.totalCourses = this.usersService.totalCourses;
  }
}
