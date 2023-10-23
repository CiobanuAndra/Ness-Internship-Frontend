import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-require-attention-table',
  templateUrl: './users-require-attention-table.component.html',
  styleUrls: ['./users-require-attention-table.component.scss'],
})
export class UsersRequireAttentionTableComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  ngOnInit() {}
}
