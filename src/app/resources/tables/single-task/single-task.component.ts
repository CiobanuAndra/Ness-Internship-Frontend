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
  @ViewChild(MatStepper) stepper!: MatStepper;
  @Input() secondFormGroup!: FormGroup;
  @Output() onSingleFormValid = new EventEmitter<boolean>;
  showLinkError = false;
  showDurationFieldEmptyError = false;
  showUnlockFieldEmptyError = false;
  showUnlockTimeExceedsDurationError = false;

  checkSingleForm(): boolean {
    const linkControl = this.secondFormGroup.get('link');
    const durationHourControl = this.secondFormGroup.get('durationHour');
    const durationMinutesControl = this.secondFormGroup.get('durationMinutes');
    const unlockHourControl = this.secondFormGroup.get('unlockHour');
    const unlockMinutesControl = this.secondFormGroup.get('unlockMinutes');
  
    if (linkControl && durationHourControl && durationMinutesControl && unlockHourControl && unlockMinutesControl) {
      this.showLinkError = !linkControl.valid;
      this.showDurationFieldEmptyError = !durationHourControl.value && !durationMinutesControl.value;
  
      durationHourControl.setValue(durationHourControl.value || 0);
      durationMinutesControl.setValue(durationMinutesControl.value || 0);
  
      this.showUnlockFieldEmptyError = !unlockHourControl.value && !unlockMinutesControl.value;
  
      unlockHourControl.setValue(unlockHourControl.value || 0);
      unlockMinutesControl.setValue(unlockMinutesControl.value || 0);
  
      const unlockTimeExceedsDuration =
        unlockHourControl.value > durationHourControl.value ||
        (unlockHourControl.value === durationHourControl.value && unlockMinutesControl.value > durationMinutesControl.value);
  
      this.showUnlockTimeExceedsDurationError = unlockTimeExceedsDuration;
  
      return !this.showLinkError && !this.showDurationFieldEmptyError && !this.showUnlockFieldEmptyError && !unlockTimeExceedsDuration;
    }
    
    return false;
  }
}