import { Component, ViewChild } from '@angular/core';
import { RequireattentionComponent } from './tables/requireattentions/requireattention/requireattention.component';
import { UsersService } from 'src/app/services/users/users.service';
import { UserModal } from 'src/app/interfaces/users/user-modal.model';

@Component({
  selector: 'app-addbulkusers',
  templateUrl: './addbulkusers.component.html',
  styleUrls: ['./addbulkusers.component.scss']
})
export class AddbulkusersComponent {
  @ViewChild(RequireattentionComponent) child!:RequireattentionComponent;

  constructor(private usersService: UsersService) {}

  addUsers() {
    this.usersService.loadUsersRequireModal().subscribe(
      (users: UserModal[]) => {
        if (users.length > 0) {
          this.child.expandAllRows();
        } else {
          console.log('Its working, proceed to submit the action');
        }
      },
      (error) => {
        console.error('Error', error);
      }
    );
  };

}
