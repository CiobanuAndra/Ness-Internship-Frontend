import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-add-bluck-users',
  templateUrl: './add-bluck-users.component.html',
  styleUrls: ['./add-bluck-users.component.scss'],
})
export class AddBluckUsersComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  openSidenav() {
    this.sidenav.open();
  }

  closeSidenav() {
    this.sidenav.close();
  }
}
