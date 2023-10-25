import { trigger, state, style, transition, animate } from '@angular/animations';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AwaitConfirmationTable, RequireAttentionTable } from 'src/app/enums/addbulkuser-table';
import { UserModal } from 'src/app/interfaces/users/user-modal.model';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-addbulkuser-table',
  templateUrl: './addbulkuser-table.component.html',
  styleUrls: ['./addbulkuser-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ],
})

export class AddbulkuserTableComponent implements OnInit{
  @Input() selectedTableAttention = '';
  @Input() selectedTableConfirmation = '';

  dataSourceAttention = new MatTableDataSource<UserModal>;
  dataSourceConfirmation = new MatTableDataSource<UserModal>;
  expandedElement: UserModal[] | null | undefined = [];

  columnsToDisplayAttention: string[] = this.parseEnumToArray(RequireAttentionTable) as string[];
  columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplayAttention, 'options'];
  columnsToDisplayConfirmation = this.parseEnumToArray(AwaitConfirmationTable);

  parseEnumToArray(enumObject: any) {
    return Object.values(enumObject).filter(value => isNaN(Number(value)));
  }

  constructor(private liveAnnouncer: LiveAnnouncer, private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData():void {
    this.fetchUserRequireModal();
    this.fetchUserAwaitModal();
  }

  fetchUserRequireModal(): void {
    this.usersService.loadUsersRequireModal().subscribe(data => {
      this.dataSourceAttention.data = data;
    });
  };

  fetchUserAwaitModal(): void {
    this.usersService.loadUsersAwaitModal().subscribe(data => {
      this.dataSourceConfirmation.data = data;
    });
  };
  
  //Sorting
  @ViewChild(MatSort) sortAttention!:MatSort;
  @ViewChild(MatSort) sortConfirmation!:MatSort;

  ngAfterViewInit(): void {
    this.dataSourceAttention.sort = this.sortAttention;
    this.dataSourceConfirmation.sort = this.sortConfirmation;
  };

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  };

  //Check if tables have users with problems and if no proceed to submit
  public postUsers(): void {
    this.usersService.loadUsersRequireModal().subscribe(
      (users: UserModal[]) => {
        if (users.length > 0) {
          this.expandAllRows();
        } else {
          //Proceed to send data
        }
      }
    );
  }

  //Open multiple rows at the same time
  expandAllRows() {
    for (const element of this.dataSourceAttention.data) {
      if (!this.isExpanded(element)) {
        this.pushPopElement(element);
      }
    }
  }

   checkExpanded(element: UserModal): boolean {
    let flag = false;
    if (this.expandedElement !== null) {
      if (Array.isArray(this.expandedElement)) {
        this.expandedElement.forEach((e) => {
          if (e === element) {
            flag = true;
          }
        });
      }
    }
    return flag;
  };
  
  pushPopElement(element: UserModal) {
    if (this.expandedElement !== null) {
      if (Array.isArray(this.expandedElement)) {
        const index = this.expandedElement.indexOf(element);
        if (index === -1) {
          this.expandedElement.push(element);
        } else {
          this.expandedElement.splice(index, 1);
        }
      } else {
        console.error("this.expandedElement is not an array");
      }
    } else {
      console.error("this.expandedElement is null");
    }
  };

  //toggle for arrow buttons
  isExpanded(element: UserModal): boolean {
    if (Array.isArray(this.expandedElement)) {
      return this.expandedElement.includes(element);
    }
    return false;
  };

  //Stop extend row event for options button
  stopPropagation(event: Event): void {
    event.stopPropagation();
  };
}
