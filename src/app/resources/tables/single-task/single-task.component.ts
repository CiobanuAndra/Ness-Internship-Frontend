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
  @Output() onSingleFormValid = new EventEmitter<boolean>;
  showLinkError = false;
  showDurationFieldEmptyError = false;
  showUnlockFieldEmptyError = false;
  showUnlockTimeExceedsDurationError = false;

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
        this.showDurationFieldEmptyError = true;
      } else {
        this.showDurationFieldEmptyError = false;

        if (!durationHourControl.value) {
          durationHourControl.setValue(0);
        } else if (!durationMinutesControl.value) {
          durationMinutesControl.setValue(0);
        }
      }

      if (!unlockHourControl.value && !unlockMinutesControl.value) {
        this.showUnlockFieldEmptyError = true;
        this.showUnlockTimeExceedsDurationError = false; // Remove the showUnlockHourError assignment
      } else {
        this.showUnlockFieldEmptyError = false;

        if (!unlockHourControl.value) {
          unlockHourControl.setValue(0);
        } else if (!unlockMinutesControl.value) {
          unlockMinutesControl.setValue(0);
        }

        if (
          unlockHourControl.value > durationHourControl.value ||
          (unlockHourControl.value === durationHourControl.value && unlockMinutesControl.value > durationMinutesControl.value)
        ) {
          this.showUnlockTimeExceedsDurationError = true;
        } else {
          this.showUnlockTimeExceedsDurationError = false;
        }

        return !this.showLinkError && !this.showDurationFieldEmptyError && !this.showUnlockFieldEmptyError && !this.showUnlockTimeExceedsDurationError;
      }
    }
    return false;
  }
}