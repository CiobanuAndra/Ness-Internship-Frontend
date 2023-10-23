import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ResourcesService } from 'src/app/services/resources.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  @Input() showSidenav!: boolean;
  @Output() showSidenavChange = new EventEmitter<boolean>();
  showTitleAlert = false;
  showDescriptionAlert = false;
  showOrderAlert = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isOptional = false;
  firstInputValue: string = '';

  constructor(private _formBuilder: FormBuilder, private resourcesService: ResourcesService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      order: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  closeDialog() {
    this.showSidenav = false;
    this.showSidenavChange.emit(this.showSidenav);
    this.resourcesService.setSidenavVisibility(false);
  }

  moveToDetailsStepper(stepper: MatStepper) {
    const titleValue = this.firstFormGroup.get('title')!.value.trim();
    const descriptionValue = this.firstFormGroup.get('description')!.value.trim();
    const orderValue = this.firstFormGroup.get('order')!.value;

    const isTitleEmpty = titleValue === '';
    const isDescriptionEmpty = descriptionValue === '';
    const isOrderEmpty = orderValue === '';
    const isOrderNaN = isNaN(orderValue);

    if (!isTitleEmpty || !isDescriptionEmpty || !isOrderEmpty || !isOrderNaN) {
      this.firstFormGroup.updateValueAndValidity();

      const isTitleValid = this.firstFormGroup.get('title')!.valid;
      const isDescriptionValid = this.firstFormGroup.get('description')!.valid;
      const isOrderValid = this.firstFormGroup.get('order')!.valid;

      if (!isTitleValid || !isDescriptionValid || !isOrderValid) {
        this.showTitleAlert = !isTitleValid;
        this.showDescriptionAlert = !isDescriptionValid;
        this.showOrderAlert = !isOrderValid;
      } else {
        stepper.next();
        this.showTitleAlert = false;
        this.showDescriptionAlert = false;
        this.showOrderAlert = false;
      }
    }
  }

  onTitleInputChange() {
    const titleValue = this.firstFormGroup.get('title')!.value.trim();
    this.showTitleAlert = titleValue === '';
  }
  
  onDescriptionInputChange() {
    const descriptionValue = this.firstFormGroup.get('description')!.value.trim();
    this.showDescriptionAlert = descriptionValue === '';
  }
  
  onOrderInputChange() {
    const orderValue = this.firstFormGroup.get('order')!.value;
    this.showOrderAlert = isNaN(orderValue) || orderValue === null || orderValue === '';
  }  
  
}