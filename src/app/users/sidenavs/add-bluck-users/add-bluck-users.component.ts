import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './service/sidenav.service';

@Component({
  selector: 'app-add-bluck-users',
  templateUrl: './add-bluck-users.component.html',
  styleUrls: ['./add-bluck-users.component.scss'],
})
export class AddBluckUsersComponent {
  isSidenavOpen = false;

  constructor(private sidenavService: SidenavService) {}

  toggleSidenav() {
    this.sidenavService.toggleSidenav();
  }

  isSidenavOpened() {
    return this.sidenavService.isSidenavOpened();
  }
}
