import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormType} from 'src/app/enums/form-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ResourcesService } from 'src/app/services/resources/resources.service';
import { HostListener } from '@angular/core';
import { MultipleTaskComponent } from '../multiple-task/multiple-task.component';
import { SingleTaskComponent } from '../single-task/single-task.component';
import { DialogService } from 'src/app/services/users/dialog.service';
import { AddTaskTitleError, AddTaskDescriptionError } from 'src/app/enums/addtask-error';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  @ViewChild(MultipleTaskComponent) multipleTaskComponent!: MultipleTaskComponent;
  @ViewChild(SingleTaskComponent) singleTaskComponent!: SingleTaskComponent;
  @ViewChild('stepper') stepper!: MatStepper;
  @Input() showSidenav!: boolean;
  @Input() isDialogOpen = false; 
  @Output() showSidenavChange = new EventEmitter<boolean>();
  showTitleAlert = false;
  showDescriptionAlert = false;
  showOrderAlert = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  numericRegex: string = '^[0-9]+';
  httpsUrlPattern = '^(https?://[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(?:/\\S*)?)$';
  isSingleButtonClick: boolean = true;
  isMultipleButtonClick: boolean = false;
  selectedFormType: FormType = FormType.SINGLE;
  addTaskTitleError: AddTaskTitleError = AddTaskTitleError.titleRequired;
  addTaskDescriptionError: AddTaskDescriptionError = AddTaskDescriptionError.descriptionRequired

  constructor(
    private formBuilder: FormBuilder,
    private resourcesService: ResourcesService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(800)]],
      order: ['', [Validators.required, Validators.pattern(this.numericRegex)]],
    });
    this.secondFormGroup = this.formBuilder.group({
      link: [
        '',
        [Validators.required, Validators.pattern(this.httpsUrlPattern)],
      ],
      durationHour: ['', [Validators.required]],
      durationMinutes: ['', [Validators.required]],
      unlockHour: ['', [Validators.required]],
      unlockMinutes: ['', [Validators.required]],
    });

    this.checkValueChanges();
  }

  closeDialog(): void {
    this.isDialogOpen = true;
    this.dialogService.openConfirmationDialog().then((result) => {
      this.isDialogOpen = false;
      if (result) {
        this.showSidenav = false;
        this.showSidenavChange.emit(this.showSidenav);
        this.resourcesService.setSidenavVisibility(false);
      }
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
      this.closeDialog();
    }
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
      this.showDescriptionAlert =
        !this.firstFormGroup.get('description')!.valid;
      this.showOrderAlert = !this.firstFormGroup.get('order')!.valid;
    }
  }

  checkValueChanges(): void {
    const titleControl = this.firstFormGroup.get('title')!;
    const descriptionControl = this.firstFormGroup.get('description')!;
    const orderControl = this.firstFormGroup.get('order')!;
  
    titleControl.valueChanges.subscribe((titleValue) => {
      const isTitleEmpty = titleValue.trim() === '';
      const isTitleLengthInvalid = titleValue.trim().length < 2 || titleValue.trim().length > 200;
      this.showTitleAlert = isTitleEmpty || isTitleLengthInvalid;
      this.addTaskTitleError = isTitleEmpty
        ? AddTaskTitleError.titleRequired
        : isTitleLengthInvalid
        ? AddTaskTitleError.titleLength
        : AddTaskTitleError.noError;
    });
  
    descriptionControl.valueChanges.subscribe((descriptionValue) => {
      const isDescriptionEmpty = descriptionValue.trim() === '';
      const isDescriptionLengthInvalid = descriptionValue.trim().length < 2 || descriptionValue.trim().length > 800;
      this.showDescriptionAlert = isDescriptionEmpty || isDescriptionLengthInvalid;
      this.addTaskDescriptionError = isDescriptionEmpty
        ? AddTaskDescriptionError.descriptionRequired
        : isDescriptionLengthInvalid
        ? AddTaskDescriptionError.descriptionLength
        : AddTaskDescriptionError.noError;
    });
  
    orderControl.valueChanges.subscribe((orderValue) => {
      this.showOrderAlert = !new RegExp(this.numericRegex).test(orderValue);
    });
  }  
  
  toggleFormType(isSingle: boolean): void {
    this.isSingleButtonClick = isSingle;
    this.isMultipleButtonClick = !isSingle;
    this.selectedFormType = isSingle ? FormType.SINGLE : FormType.WITH_COURSES;
  
    const config: { [key: string]: any } = isSingle
      ? {
          link: this.formBuilder.control('', [Validators.required, Validators.pattern(this.httpsUrlPattern)]),
          durationHour: this.formBuilder.control('', [Validators.required]),
          durationMinutes: this.formBuilder.control('', [Validators.required]),
          unlockHour: this.formBuilder.control('', [Validators.required]),
          unlockMinutes: this.formBuilder.control('', [Validators.required]),
        }
      : {
          selectedCourses: this.formBuilder.control([], [Validators.required]),
        };

    this.secondFormGroup = this.formBuilder.group(config);
  }
  
  checkSingleOrMultiple(stepper: MatStepper): void {
    switch (this.selectedFormType) {
      case FormType.WITH_COURSES:
        this.multipleTaskComponent?.selectedCourses.length === 0
        ? (this.multipleTaskComponent.showErrorMessage = true)
        : (this.multipleTaskComponent.showErrorMessage = false);

        if (!this.multipleTaskComponent?.showErrorMessage) {
        stepper.next();
    }
        break;
  
      case FormType.SINGLE:
        if (this.singleTaskComponent.checkSingleForm()) {
          stepper.next();
        }
        break;
    }
  }
}