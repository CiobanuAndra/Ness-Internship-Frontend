import { Component, ViewChild } from '@angular/core';
import { RequireattentionComponent } from './tables/requireattentions/requireattention/requireattention.component';

@Component({
  selector: 'app-addbulkusers',
  templateUrl: './addbulkusers.component.html',
  styleUrls: ['./addbulkusers.component.scss']
})
export class AddbulkusersComponent {
  @ViewChild(RequireattentionComponent) child!:RequireattentionComponent;

  addUsers(): void {
    this.child.postUsers();
  };

}
