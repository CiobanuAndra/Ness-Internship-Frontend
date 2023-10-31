import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ResourcesService } from 'src/app/services/resources/resources.service';
import { HostListener } from '@angular/core';
import { MultipleTaskComponent } from '../multiple-task/multiple-task.component';
import { SingleTaskComponent } from '../single-task/single-task.component';

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
  numericRegex: string = '^[0-9]+';
  httpsUrlPattern = '^(https?://[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(?:/\\S*)?)$';
  isSingleButtonClick: boolean = true;
  isMultipleButtonClick: boolean = false;
  selectedFormType: 'SINGLE' | 'WITH COURSES' = 'SINGLE';

  constructor(
    private formBuilder: FormBuilder,
    private resourcesService: ResourcesService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
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

  @ViewChild(MultipleTaskComponent)
  multipleTaskComponent!: MultipleTaskComponent;
  @ViewChild(SingleTaskComponent) singleTaskComponent!: SingleTaskComponent;
  @ViewChild('stepper') stepper!: MatStepper;

  closeDialog(): void {
    this.showSidenav = false;
    this.showSidenavChange.emit(this.showSidenav);
    this.resourcesService.setSidenavVisibility(false);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
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

  private checkValueChanges(): void {
    this.firstFormGroup.get('title')!.valueChanges.subscribe((titleValue) => {
      this.showTitleAlert = titleValue.trim() === '';
    });
    this.firstFormGroup
      .get('description')!
      .valueChanges.subscribe((descriptionValue) => {
        this.showDescriptionAlert = descriptionValue.trim() === '';
      });
    this.firstFormGroup.get('order')!.valueChanges.subscribe((orderValue) => {
      this.showOrderAlert = !new RegExp(this.numericRegex).test(orderValue);
    });
  }

  toggleFormType(isSingle: boolean): void {
    this.isSingleButtonClick = isSingle;
    this.isMultipleButtonClick = !isSingle;
    this.selectedFormType = isSingle ? 'SINGLE' : 'WITH COURSES';

    if (isSingle) {
      this.secondFormGroup.setControl(
        'link',
        this.formBuilder.control('', [Validators.required])
      );
      this.secondFormGroup.setControl(
        'durationHour',
        this.formBuilder.control('', [Validators.required])
      );
      this.secondFormGroup.setControl(
        'durationMinutes',
        this.formBuilder.control('', [Validators.required])
      );
      this.secondFormGroup.setControl(
        'unlockHour',
        this.formBuilder.control('', [Validators.required])
      );
      this.secondFormGroup.setControl(
        'unlockMinutes',
        this.formBuilder.control('', [Validators.required])
      );
      this.secondFormGroup.removeControl('selectedCourses');
    } else {
      this.secondFormGroup.setControl(
        'selectedCourses',
        this.formBuilder.control([], [Validators.required])
      );
      this.secondFormGroup.removeControl('link');
      this.secondFormGroup.removeControl('durationHour');
      this.secondFormGroup.removeControl('durationMinutes');
      this.secondFormGroup.removeControl('unlockHour');
      this.secondFormGroup.removeControl('unlockMinutes');
    }
  }

  checkSingleOrMultiple(stepper: MatStepper): void {
    if (this.selectedFormType === 'WITH COURSES') {
      if (this.multipleTaskComponent) {
        if (this.multipleTaskComponent.selectedCourses.length === 0) {
          this.multipleTaskComponent.showErrorMessage = true;
        } else if (this.multipleTaskComponent.selectedCourses.length > 0) {
          this.multipleTaskComponent.showErrorMessage = false;
          stepper.next();
        }
      }
    } else if (this.selectedFormType === 'SINGLE') {
      if (this.singleTaskComponent.checkSingleForm()) {
        stepper.next();
      }
    }
  }
}
