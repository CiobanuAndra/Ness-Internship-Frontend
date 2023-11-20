import { Component, Input, OnInit } from '@angular/core';
import { ResourcesService } from 'src/app/services/resources/resources.service';
import { Course } from 'src/app/interfaces/resources/course.model';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-multiple-task',
  templateUrl: './multiple-task.component.html',
  styleUrls: ['./multiple-task.component.scss'],
})
export class MultipleTaskComponent implements OnInit {
  @Input() secondFormGroup!: FormGroup;
  selectedCourses: any[] = [];
  showErrorMessage: boolean = false;
  courses: any = [];
  rewards: any = [];
  rewardTypeNameMap: any = {};

  constructor(private resourcesService: ResourcesService) {}

  updateRewardTypeName(): void {
    this.rewardTypeNameMap = {};

    for (const course of this.selectedCourses) {
      const matchingReward = this.rewards.find((reward: any) => reward.id === course.rewardId);
      if (matchingReward) {
        this.rewardTypeNameMap[course.id] = matchingReward.name;
      }
    }
  }

  ngOnInit(): void {
    this.fetchDataRewards();
    this.resourcesService.getUnassignedCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }


  onCourseSelected(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOptionIndex = parseInt(selectElement.value, 10);
    const selectedOption = this.courses[selectedOptionIndex];

    if (
      selectedOptionIndex >= 0 &&
      !this.selectedCourses.includes(selectedOption)
    ) {
      this.selectedCourses.push(selectedOption);
      this.showErrorMessage = false;
      this.updateSelectedCoursesControl();
      this.updateRewardTypeName();
      this.updateTotalDuration();
      this.updateTotalTimeToUnlock();
      this.updateTotalLink();
    }
  }

  removeCourse(index: number): void {
    if (index >= 0 && index < this.selectedCourses.length) {
      this.selectedCourses.splice(index, 1);
      this.updateSelectedCoursesControl();
      this.updateRewardTypeName();
      this.updateTotalDuration();
      this.updateTotalTimeToUnlock();
      this.updateTotalLink();
    }
  }

  updateTotalLink(): void {
    const links = this.selectedCourses.map(course => course.link).filter(link => !!link).join(', ');
    const linkControl = this.secondFormGroup.get('link');
    if (linkControl) {
      linkControl.setValue(links);
    }
  }

  private updateSelectedCoursesControl() {
    const selectedCoursesControl = this.secondFormGroup?.get('selectedCourses');

    if (selectedCoursesControl) {
      selectedCoursesControl.patchValue([...this.selectedCourses]);
    }
  }

  fetchDataRewards(): void {
    this.resourcesService.getRewards().subscribe((data: any) => {
      this.rewards = data.content;
    });
  }

  calculateTotalDuration(): number {
    return this.selectedCourses.reduce((totalDuration, course) => totalDuration + course.duration, 0);
  }

  calculateTotalTimeToUnlock(): number {
    return this.selectedCourses.reduce((totalTimeToUnlock, course) => totalTimeToUnlock + course.timeToUnlock, 0);
  }

  updateTotalDuration(): void {
    const totalDuration = this.calculateTotalDuration();
    const durationControl = this.secondFormGroup.get('duration');
    if (durationControl) {
      durationControl.setValue(totalDuration);
    }
  }

  updateTotalTimeToUnlock(): void {
    const totalTimeToUnlock = this.calculateTotalTimeToUnlock();
    const timeToUnlockControl = this.secondFormGroup.get('timeToUnlock');
    if (timeToUnlockControl) {
      timeToUnlockControl.setValue(totalTimeToUnlock);
    }
  }
}
