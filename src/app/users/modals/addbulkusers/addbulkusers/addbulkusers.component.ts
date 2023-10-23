import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { RequireattentionComponent } from './tables/requireattentions/requireattention/requireattention.component';
import { UsersService } from 'src/app/services/users.service';
import { UserModal } from 'src/app/interfaces/users/user-modal.model';

@Component({
  selector: 'app-addbulkusers',
  templateUrl: './addbulkusers.component.html',
  styleUrls: ['./addbulkusers.component.scss']
})
export class AddbulkusersComponent {
  @ViewChild(RequireattentionComponent) child!:RequireattentionComponent;

  constructor(private userssService: UsersService) {}

  addUsers() {
    this.userssService.loadUsersRequireModal().subscribe(
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
