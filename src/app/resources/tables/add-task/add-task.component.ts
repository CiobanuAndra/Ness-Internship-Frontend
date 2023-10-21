import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ResourcesService } from 'src/app/services/resources.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  @Input() showSidenav!: boolean;
  @Output() showSidenavChange = new EventEmitter<boolean>();
  showGeneralAlertsInput1 = false;
  showGeneralAlertsInput2 = false;
  showGeneralAlertsInput3 = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isOptional = false;
  firstInputValue: string = '';

  constructor(private _formBuilder: FormBuilder, private dialog: MatDialog, private resourcesService: ResourcesService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      order: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['',  Validators.required]
    });
  }

  closeDialog() {
    this.showSidenav = false;
    this.showSidenavChange.emit(this.showSidenav);
  }

  goForward(stepper: MatStepper) {
    const nameValue = this.firstFormGroup.get('name')!.value.trim();
    const descriptionValue = this.firstFormGroup.get('description')!.value.trim();
    const orderValue = this.firstFormGroup.get('order')!.value;

    const isNameEmpty = nameValue === '';
    const isDescriptionEmpty = descriptionValue === '';
    const isOrderEmpty = orderValue === '';
    const isOrderNaN = isNaN(orderValue);

    if (isNameEmpty || isDescriptionEmpty || isOrderEmpty || isOrderNaN) {
        this.showGeneralAlertsInput1 = isNameEmpty;
        this.showGeneralAlertsInput2 = isDescriptionEmpty;
        this.showGeneralAlertsInput3 = isOrderEmpty || isOrderNaN;
    } else {
        const isNameValid = this.firstFormGroup.get('name')!.valid;
        const isDescriptionValid = this.firstFormGroup.get('description')!.valid;
        const isOrderValid = this.firstFormGroup.get('order')!.valid;

        if (!isNameValid || !isDescriptionValid || !isOrderValid) {
            this.showGeneralAlertsInput1 = !isNameValid;
            this.showGeneralAlertsInput2 = !isDescriptionValid;
            this.showGeneralAlertsInput3 = !isOrderValid;
        } else {
            stepper.next();
            this.showGeneralAlertsInput1 = false;
            this.showGeneralAlertsInput2 = false;
            this.showGeneralAlertsInput3 = false;
        }
    }
}

}
