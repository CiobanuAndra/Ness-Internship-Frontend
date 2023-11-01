import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourcesService } from 'src/app/services/resources/resources.service';

@Component({
  selector: 'app-addnewuser',
  templateUrl: './addnewuser.component.html',
  styleUrls: ['./addnewuser.component.scss']
})
export class AddnewuserComponent {
  @Input() showSidenav!: boolean;
  @Output() showSidenavChange = new EventEmitter<boolean>();

  constructor(private resourcesService: ResourcesService) {}

  closeAside(): void {
    this.showSidenav = false;
    this.showSidenavChange.emit(this.showSidenav);
    this.resourcesService.setSidenavVisibility(false);
  }
}
