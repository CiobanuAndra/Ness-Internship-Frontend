import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ResourcesService } from 'src/app/services/resources.service';
import { Course } from 'src/app/interfaces/resources/course.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-multiple-task',
  templateUrl: './multiple-task.component.html',
  styleUrls: ['./multiple-task.component.scss']
})
export class MultipleTaskComponent {
  @Input() secondFormGroup!: FormGroup;
  selectedCourses: Course[] = [];
  showErrorMessage: boolean = false;
  courses: Course[] = [];

  constructor(private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.resourcesService.loadCourses().subscribe((courses) => {
      const filteredCourses = courses.filter((course) => course.task === "");
      this.courses = filteredCourses;
    });
  }
  onCourseSelected(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOptionIndex = parseInt(selectElement.value, 10);

    if (selectedOptionIndex >= 0) {
      const selectedOption = this.courses[selectedOptionIndex];

      if (!this.selectedCourses.includes(selectedOption)) {
        this.selectedCourses.push(selectedOption);
        this.showErrorMessage = false;
      }
    }
  }

  removeCourse(index: number): void {
    if (this.secondFormGroup) {
      const selectedCoursesControl = this.secondFormGroup.get('selectedCourses');
      if (selectedCoursesControl) {
        if (index >= 0 && index < this.selectedCourses.length) {
          this.selectedCourses.splice(index, 1);
          selectedCoursesControl.setValue('');
          selectedCoursesControl.updateValueAndValidity();
        }
      }
    }
  }
  
}