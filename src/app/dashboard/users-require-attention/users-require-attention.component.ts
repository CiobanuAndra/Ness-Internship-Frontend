import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.model';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users-require-attention',
  templateUrl: './users-require-attention.component.html',
  styleUrls: ['./users-require-attention.component.scss'],
})
export class UsersRequireAttentionComponent implements OnInit {
  usersRequireAttention: User[] = [];

  constructor(private _usersService: UsersService) {}

  ngOnInit(): void {
    this._usersService.getUsersRequireAttention().subscribe((values) => {
      this.usersRequireAttention = values;
    });
  }
}
