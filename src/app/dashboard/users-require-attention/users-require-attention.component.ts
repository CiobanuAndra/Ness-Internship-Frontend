import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { UserRequireAttention } from 'src/app/interfaces/user-require-attention.model';

@Component({
  selector: 'app-users-require-attention',
  templateUrl: './users-require-attention.component.html',
  styleUrls: ['./users-require-attention.component.scss'],
})
export class UsersRequireAttentionComponent implements OnInit {
  usersRequireAttention: UserRequireAttention[] = [];
  allUsersRequireAttention: UserRequireAttention[] = [];

  constructor(private usersService: UsersService, private router: Router) {}

  navigateToUsersRequireAttentionTable() {
    this.router.navigate(['/users-require-attention-table']);
  }
  ngOnInit(): void {
    this.usersService.getUsersRequireAttention().subscribe((values) => {
      this.usersRequireAttention = values.slice(0, 3);
      this.allUsersRequireAttention = values;
    });
  }
}
