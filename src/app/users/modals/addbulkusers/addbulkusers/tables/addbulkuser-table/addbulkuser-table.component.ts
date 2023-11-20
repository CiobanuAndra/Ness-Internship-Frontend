import { trigger, state, style, transition, animate } from '@angular/animations';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AwaitConfirmationTable, RequireAttentionTable, tableHeaders} from 'src/app/enums/addbulkuser-table';
import { UserModal } from 'src/app/interfaces/users/user-modal.model';
import { UsersService } from 'src/app/services/users/users.service';
import { EdituserComponent } from '../../edituser/edituser.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-addbulkuser-table',
  templateUrl: './addbulkuser-table.component.html',
  styleUrls: ['./addbulkuser-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed, void',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
      transition(
        'expanded <=> void',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ],
})

export class AddbulkuserTableComponent{
  @ViewChild(MatSort) sortAttention!:MatSort;
  @ViewChild(MatSort) sortConfirmation!:MatSort;
  
  @Input() selectedTableAttention = '';
  @Input() selectedTableConfirmation = '';

  @Input() dataSource!: MatTableDataSource<UserModal>;

  @Output() deleteUserEvent = new EventEmitter<any>();

  expandedElement: UserModal[] = [];

  columnsToDisplayAttention: string[] = this.parseEnumToArray(RequireAttentionTable) as string[];
  columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplayAttention, 'options'];
  columnsToDisplayConfirmation = this.parseEnumToArray(AwaitConfirmationTable);

  tableAttention  = tableHeaders.attention;
  tableConfirmation = tableHeaders.confirmation;

  userDetails = -1;

  constructor(private liveAnnouncer: LiveAnnouncer, private usersService: UsersService, private dialog: MatDialog) {}

  parseEnumToArray(enumObject: any) {
    return Object.values(enumObject).filter(value => isNaN(Number(value)));
  };

  //Sorting
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sortAttention;
    this.dataSource.sort = this.sortConfirmation;
  };

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  };

  //Open multiple rows at the same time
  expandMultipleRows() {
    for (const element of this.dataSource.data) {
      if (!this.checkExpanded(element)) {
        this.pushPopElement(element);
      }
    }
  };

  checkExpanded(element: UserModal): boolean {
    return this.expandedElement.includes(element);
  };
  
  pushPopElement(element: UserModal) {
    const index = this.expandedElement.indexOf(element);
    index === -1 ? this.expandedElement.push(element) : this.expandedElement.splice(index, 1);
  };

  //Stop extend row event for options button
  stopPropagation(event: Event): void {
    event.stopPropagation();
  };

  //get userIndex from table
  getUserDetails(userDetailsFromTable: any): void {
    this.userDetails = this.dataSource.data.indexOf(userDetailsFromTable);
  };

  //Delete user
  deleteUserEventFunction(userDetailsFromTable: any): void {
    const userIndex = this.dataSource.data.indexOf(userDetailsFromTable);
    this.deleteUserEvent.emit(userIndex);
  };

  //Open modal to edit rows data
  openEditUser() {
    this.dialog.open(EdituserComponent, {
      autoFocus: false,
      data: {
        user: this.userDetails
      }
    });
  };
}
