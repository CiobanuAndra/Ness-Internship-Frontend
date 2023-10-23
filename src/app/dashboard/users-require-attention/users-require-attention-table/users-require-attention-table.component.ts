import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserRequireAttention } from 'src/app/interfaces/user-require-attention.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-require-attention-table',
  templateUrl: './users-require-attention-table.component.html',
  styleUrls: ['./users-require-attention-table.component.scss'],
})
export class UsersRequireAttentionTableComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  displayedColumns: string[] = ['name', 'tasksLeft', 'timeLeft', 'buttons'];
  dataSource = new MatTableDataSource<UserRequireAttention>();

  ngOnInit() {
    this.usersService.getUsersRequireAttention().subscribe((values) => {
      this.dataSource.data = values;
    });
  }
}
