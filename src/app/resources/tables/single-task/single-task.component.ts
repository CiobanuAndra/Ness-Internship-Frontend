import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss']
})
export class SingleTaskComponent {
  @Input() secondFormGroup!: FormGroup;
  @Output() onSingleFormValid = new EventEmitter<boolean>();
  showLinkError = false;
  showDurationError = false;
  showUnlockError = false;
  showUnlockHourError = false;
  showUnlockMinutesError = false;

  @ViewChild(MatStepper) stepper!: MatStepper;

  checkSingleForm(): boolean {
    const linkControl = this.secondFormGroup.get('link');
    const durationHourControl = this.secondFormGroup.get('durationHour');
    const durationMinutesControl = this.secondFormGroup.get('durationMinutes');
    const unlockHourControl = this.secondFormGroup.get('unlockHour');
    const unlockMinutesControl = this.secondFormGroup.get('unlockMinutes');

    if (linkControl && durationHourControl && durationMinutesControl && unlockHourControl && unlockMinutesControl) {
      if (linkControl.valid) {
        this.showLinkError = false;
      } else {
        this.showLinkError = true;
      }

      if (!durationHourControl.value && !durationMinutesControl.value) {
        this.showDurationError = true;
      } else {
        this.showDurationError = false;

        if (!durationHourControl.value) {
          durationHourControl.setValue(0);
        } else if (!durationMinutesControl.value) {
          durationMinutesControl.setValue(0);
        }
      }

      if (!unlockHourControl.value && !unlockMinutesControl.value) {
        this.showUnlockError = true;
        this.showUnlockHourError = false;
        this.showUnlockMinutesError = false;
      } else {
        this.showUnlockError = false;

        if (!unlockHourControl.value) {
          unlockHourControl.setValue(0);
        } else if (!unlockMinutesControl.value) {
          unlockMinutesControl.setValue(0);
        }

        if (
          unlockHourControl.value > durationHourControl.value ||
          (unlockHourControl.value === durationHourControl.value && unlockMinutesControl.value > durationMinutesControl.value)
        ) {
          this.showUnlockMinutesError = true;
        } else {
          this.showUnlockMinutesError = false;
        }

        return !this.showLinkError && !this.showDurationError && !this.showUnlockError && !this.showUnlockMinutesError;
      }
    }
    return false;
  }
}