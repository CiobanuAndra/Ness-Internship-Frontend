import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-bluck-users',
  templateUrl: './add-bluck-users.component.html',
  styleUrls: ['./add-bluck-users.component.scss'],
})
export class AddBluckUsersComponent {
  @Input() opened!: boolean;

  constructor() {}
}
