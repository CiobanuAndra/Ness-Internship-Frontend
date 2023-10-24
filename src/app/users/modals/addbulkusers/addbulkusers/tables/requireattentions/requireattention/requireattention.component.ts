import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users/users.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UserModal } from 'src/app/interfaces/users/user-modal.model';

@Component({
  selector: 'app-requireattention',
  templateUrl: './requireattention.component.html',
  styleUrls: ['./requireattention.component.scss'],
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

export class RequireattentionComponent implements AfterViewInit, OnInit{
  expandedElement: UserModal[] | null | undefined= [];
  dataSource = new MatTableDataSource<UserModal>;
  columnsToDisplay = ['name', 'surname', 'email'];
  columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay, 'options'];

  constructor(private liveAnnouncer: LiveAnnouncer, private usersService: UsersService) {}

  

  ngOnInit(): void {
    this.fetchUserRequireModal().subscribe(data => {
      this.dataSource.data = data;
    })
  };

  fetchUserRequireModal():Observable<UserModal[]> {
    return this.usersService.loadUsersRequireModal();
  }
  
  //Sorting
  @ViewChild(MatSort) sort!:MatSort;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  };

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  };

  //Check if tables have users with problems
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
    for (const element of this.dataSource.data) {
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