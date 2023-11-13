import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { UserRequireAttention } from 'src/app/interfaces/user-require-attention.model';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users-require-attention-table',
  templateUrl: './users-require-attention-table.component.html',
  styleUrls: ['./users-require-attention-table.component.scss'],
})
export class UsersRequireAttentionTableComponent
  implements AfterViewInit, OnInit
{
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<UserRequireAttention>();
  totalCourses: number = 0;
  displayedColumns: string[] = ['name', 'tasksLeft', 'timeLeft', 'buttons'];

  constructor(private usersService: UsersService) {}

  filterActiveUsers(): void {}

  filterInactiveUsers(): void {}

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
  }

  ngOnInit() {
    this.usersService.getUsersRequireAttention().subscribe((values) => {
      this.dataSource.data = values;
    });
  }
}
