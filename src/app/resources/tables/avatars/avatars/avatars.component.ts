import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Avatar } from 'src/app/interfaces/resources/avatar.model';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ResourcesService } from 'src/app/services/resources.service';

@Component({
  selector: 'app-avatars',
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.scss']
})
export class AvatarsComponent implements AfterViewInit, OnInit{

  dataSource = new MatTableDataSource<Avatar>;
  columnsToDisplay = ['name', 'linked_to', 'default', 'addedBy', 'options'];

  constructor(private liveAnnouncer: LiveAnnouncer, private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.fetchAvatars().subscribe(data => {
      this.dataSource.data = data;
    })
  };

  fetchAvatars():Observable<Avatar[]> {
    return this.resourcesService.loadAvatars();
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
