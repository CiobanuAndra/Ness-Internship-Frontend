import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ResourcesService } from 'src/app/services/resources/resources.service';

@Component({
  selector: 'app-addnewuser',
  templateUrl: './addnewuser.component.html',
  styleUrls: ['./addnewuser.component.scss']
})
export class AddnewuserComponent {
  @Input() showSidenav!: boolean;
  @Output() showSidenavChange = new EventEmitter<boolean>();

  addNewUserForm = this.formBuilder.group({
    name: ['', Validators.required, Validators.minLength(2), Validators.maxLength(20)],
    surname: ['', Validators.required, Validators.minLength(2), Validators.maxLength(20)],
    email: ['', Validators.required, Validators.email],
  });

  constructor(private resourcesService: ResourcesService, private formBuilder:FormBuilder) {}

  closeAside(): void {
    this.showSidenav = false;
    this.showSidenavChange.emit(this.showSidenav);
    this.resourcesService.setSidenavVisibility(false);
  }

  onSubmit():void {
    console.log('submitted form', this.addNewUserForm.value);
  }
}
