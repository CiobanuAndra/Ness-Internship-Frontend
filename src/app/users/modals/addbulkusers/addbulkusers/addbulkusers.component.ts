import { Component, ViewChild } from '@angular/core';
import { AddbulkuserTableComponent } from './tables/addbulkuser-table/addbulkuser-table.component';

@Component({
  selector: 'app-addbulkusers',
  templateUrl: './addbulkusers.component.html',
  styleUrls: ['./addbulkusers.component.scss']
})
export class AddbulkusersComponent {
  @ViewChild(AddbulkuserTableComponent) child!:AddbulkuserTableComponent;

  selectedTableAttention = 'Attention';
  selectedTableConfirmation = 'Confirmation';

  addUsers(): void {
    this.child.postUsers();
  };

}
