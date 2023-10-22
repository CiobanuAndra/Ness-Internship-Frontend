import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

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

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
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
  }

  moveToDetailsStepper(stepper: MatStepper) {
    const nameValue = this.firstFormGroup.get('name')!.value.trim();
    const descriptionValue = this.firstFormGroup.get('description')!.value.trim();
    const orderValue = this.firstFormGroup.get('order')!.value;

    const isNameEmpty = nameValue === '';
    const isDescriptionEmpty = descriptionValue === '';
    const isOrderEmpty = orderValue === '';
    const isOrderNaN = isNaN(orderValue);

    if (!isNameEmpty || !isDescriptionEmpty || !isOrderEmpty || !isOrderNaN) {
      this.firstFormGroup.updateValueAndValidity();

      const isNameValid = this.firstFormGroup.get('name')!.valid;
      const isDescriptionValid = this.firstFormGroup.get('description')!.valid;
      const isOrderValid = this.firstFormGroup.get('order')!.valid;

      if (!isNameValid || !isDescriptionValid || !isOrderValid) {
        this.showTitleAlert = !isNameValid;
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
}