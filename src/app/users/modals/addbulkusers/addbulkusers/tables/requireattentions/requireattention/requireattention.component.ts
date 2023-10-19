import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { UserModal } from 'src/app/interfaces/users/user-modal.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-requireattention',
  templateUrl: './requireattention.component.html',
  styleUrls: ['./requireattention.component.scss'],
})
export class RequireattentionComponent implements AfterViewInit, OnInit{
  dataSource = new MatTableDataSource<UserModal>;
  columnsToDisplay = ['name', 'surname', 'email', 'options'];

  constructor(private liveAnnouncer: LiveAnnouncer, private usersService: UsersService) {}

  ngOnInit(): void {
    this.fetchUserModal().subscribe(data => {
      this.dataSource.data = data;
    })
  };

  fetchUserModal():Observable<UserModal[]> {
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
}
