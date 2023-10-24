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
  numericRegex: string = '^[0-9]+';

  constructor(private formBuilder: FormBuilder, private resourcesService: ResourcesService) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      order: ['', [Validators.required, Validators.pattern(this.numericRegex)]],
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', [Validators.required]],
    });

  this.checkValueChanges();
  }

  closeDialog(): void {
    this.showSidenav = false;
    this.showSidenavChange.emit(this.showSidenav);
    this.resourcesService.setSidenavVisibility(false);
  }

  moveToDetailsStepper(stepper: MatStepper): void {
    this.firstFormGroup.updateValueAndValidity();
    
    if (this.firstFormGroup.valid) {
      stepper.next();
      this.showTitleAlert = false;
      this.showDescriptionAlert = false;
      this.showOrderAlert = false;
    } else {
      this.showTitleAlert = !this.firstFormGroup.get('title')!.valid;
      this.showDescriptionAlert = !this.firstFormGroup.get('description')!.valid;
      this.showOrderAlert = !this.firstFormGroup.get('order')!.valid;
    }
  }

  private checkValueChanges(): void {
    this.firstFormGroup.get('title')!.valueChanges.subscribe(titleValue => {
      this.showTitleAlert = titleValue.trim() === '';
    });
    this.firstFormGroup.get('description')!.valueChanges.subscribe(descriptionValue => {
      this.showDescriptionAlert = descriptionValue.trim() === '';
    });
    this.firstFormGroup.get('order')!.valueChanges.subscribe(orderValue => {
      this.showOrderAlert = !new RegExp(this.numericRegex).test(orderValue);
    });
  }
}