import { Component, Input } from '@angular/core';
import { ResourcesService } from 'src/app/services/resources/resources.service';
import { Course } from 'src/app/interfaces/resources/course.model';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-multiple-task',
  templateUrl: './multiple-task.component.html',
  styleUrls: ['./multiple-task.component.scss'],
})
export class MultipleTaskComponent {
  @Input() secondFormGroup!: FormGroup;
  selectedCourses: Course[] = [];
  showErrorMessage: boolean = false;
  courses: Course[] = [];
  private destroy$ = new Subject<void>();

  constructor(private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.resourcesService
      .loadCourses()
      .pipe(takeUntil(this.destroy$))
      .subscribe((courses) => {
        this.courses = courses.filter((course) => course.task === '');
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
    }
  }

  removeCourse(index: number): void {
    if (index >= 0 && index < this.selectedCourses.length) {
      this.selectedCourses.splice(index, 1);
      this.updateSelectedCoursesControl();
    }
  }

  private updateSelectedCoursesControl() {
    const selectedCoursesControl = this.secondFormGroup?.get('selectedCourses');

    if (selectedCoursesControl) {
      selectedCoursesControl.patchValue([...this.selectedCourses]);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
