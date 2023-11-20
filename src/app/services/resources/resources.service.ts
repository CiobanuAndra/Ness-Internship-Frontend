import { Injectable } from '@angular/core';
import { Task } from '../../interfaces/resources/task.model';
import { Observable, of, Subject } from 'rxjs';
import { Course } from '../../interfaces/resources/course.model';
import { Avatar } from '../../interfaces/resources/avatar.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  private showSidenav = false;

  constructor(private http: HttpClient) {
    this.loadTasks();
   }

  private loadTasks(): void {
    this.getTasks(0).subscribe();
  }

  setSidenavVisibility(show: boolean): void {
    this.showSidenav = show;
  }

  getShowSidenav(): boolean {
    return this.showSidenav;
  }

  getCourses(page: number): Observable<any> {
    const url = `http://localhost:8181/api/courses?page=${page}`;
    return this.http.get<any>(url, { responseType: 'json' });
  }

  getUnassignedCourses(): Observable<any> {
    const url = `http://localhost:8181/api/courses/unassigned`;
    return this.http.get<any>(url, { responseType: 'json' });
  }

  tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  getTasks(page: number): Observable<Task[]> {
    const url = `http://localhost:8181/api/tasks/page/${page}`;
    return this.http.get<Task[]>(url, { responseType: 'json' });
  }
  

  getRewards(): Observable<any> {
    const url = `http://localhost:8282/api/reward`;
    return this.http.get<any>(url, { responseType: 'json' });
  }

  getAvatars(): Observable<any> {
    const url = `http://localhost:8282/api/avatar`;
    return this.http.get<any>(url, { responseType: 'json' });
  }

  addTask(firstFormGroup: FormGroup, secondFormGroup: FormGroup, thirdFormGroup: FormGroup): Observable<any> {
    console.log(thirdFormGroup.get('rewardValue')?.value)
    const url = 'http://localhost:8181/api/tasks';
  
    const hoursToMinutes = secondFormGroup.get('durationHour')?.value ? parseInt(secondFormGroup.get('durationHour')?.value, 10) * 60 : 0;
    const minutes = secondFormGroup.get('durationMinutes')?.value ? parseInt(secondFormGroup.get('durationMinutes')?.value, 10) : 0;
    const totalDurationInMinutes = hoursToMinutes + minutes;
    const selectedCourses = secondFormGroup.get('selectedCourses')?.value;
    const taskType = secondFormGroup.get('type')?.value;
    let requestBody;
    if (taskType === 'WITHOUT_COURSES') {
      requestBody = {
        title: firstFormGroup.get('title')?.value,
        description: firstFormGroup.get('description')?.value,
        position: firstFormGroup.get('order')?.value,
        type: secondFormGroup.get('type')?.value,
        link: secondFormGroup.get('link')?.value,
        duration: totalDurationInMinutes,
        timeToUnlock: secondFormGroup.get('unlockMinutes')?.value,
        image: thirdFormGroup.get('fileControl')?.value.name,
        rewardId: thirdFormGroup.get('rewardId')?.value,
        rewardQuantity: thirdFormGroup.get('rewardValue')?.value,
        score: thirdFormGroup.get('score')?.value,
        courses: []
      };
    } else if (taskType === 'WITH_COURSES') {
      requestBody = {
        title: firstFormGroup.get('title')?.value,
        description: firstFormGroup.get('description')?.value,
        position: firstFormGroup.get('order')?.value,
        type: secondFormGroup.get('type')?.value,
        link: secondFormGroup.get('link')?.value,
        duration: secondFormGroup.get('duration')?.value,
        timeToUnlock: secondFormGroup.get('timeToUnlock')?.value,
        image: thirdFormGroup.get('fileControl')?.value.name,
        rewardId: thirdFormGroup.get('rewardId')?.value,
        rewardQuantity: thirdFormGroup.get('rewardValue')?.value,
        score: thirdFormGroup.get('score')?.value,
        courses: selectedCourses,
      };
    }
  
    const avatarId = thirdFormGroup.get('avatarSelected')?.value[0]?.id;
  
    if (avatarId) {
      this.deleteAvatar(avatarId).subscribe();
    }
    
    return this.http.post(url, requestBody).pipe(
      switchMap(() => this.getTasks(0)),
      tap((tasks) => {
        this.tasksSubject.next(tasks);
      }))
  }
  
  deleteAvatar(avatarId: number): Observable<any> {
    const url = `http://localhost:8282/api/avatar/${avatarId}`;
    return this.http.delete<any>(url, { responseType: 'json' });
  }
  
  
  
}