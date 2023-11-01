import { Injectable } from '@angular/core';
import { Task } from '../../interfaces/resources/task.model';
import { Observable, of } from 'rxjs';
import { Course } from '../../interfaces/resources/course.model';
import { Avatar } from '../../interfaces/resources/avatar.model';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  private showSidenav = false;

  constructor() { }

  tasks: Task[] = [
    { icon: '../../../assets/icons/Ellipse.svg', name: 'repair1', type: 'easy', courses: 'API', order: 3, length: 1230, rewards: 2, dateAdded: new Date('2023-10-11'), lastEdited: new Date('2023-10-11'), editedBy: 'Ioana Maria'},
    { icon: '../../../assets/icons/file.svg', name: 'repair2', type: 'mid', courses: 'Angular Material', order: 32, length: 1202, rewards: 2, dateAdded: new Date('2023-10-15'), lastEdited: new Date('2023-10-15'), editedBy: 'Irina Nistor'},
    { icon: '../../../assets/icons/Ellipse.svg', name: 'repair3', type: 'easy', courses: 'Angular HTTP Methods', order: 3, length: 1230, rewards: 2, dateAdded: new Date('2023-10-11'), lastEdited: new Date('2023-10-11'), editedBy: 'Ioana Maria'},
    { icon: '../../../assets/icons/file.svg', name: 'repair4', type: 'mid', courses: 'Agile 101', order: 32, length: 1202, rewards: 2, dateAdded: new Date('2023-10-15'), lastEdited: new Date('2023-10-15'), editedBy: 'Irina Nistor'},
    { icon: '../../../assets/icons/Ellipse.svg', name: 'repair5', type: 'easy', courses: 'Java', order: 3, length: 1230, rewards: 2, dateAdded: new Date('2023-10-11'), lastEdited: new Date('2023-10-11'), editedBy: 'Ioana Maria'},
    { icon: '../../../assets/icons/file.svg', name: 'repair6', type: 'mid', courses: 'JavaScript', order: 32, length: 1202, rewards: 2, dateAdded: new Date('2023-10-15'), lastEdited: new Date('2023-10-15'), editedBy: 'Irina Nistor'},
  ];  

  courses: Course[] = [
    { name: 'API', task: 'repair1',link: 'file', fileType: 'Video', length: 30, rewards: 2, points: 100, dateAdded: new Date('2023-10-11'), lastEdited: new Date('2023-10-11'), editedBy: 'Ioana Maria'},
    { name: 'Angular Material', task: 'repair2', link: 'file', fileType: 'Text', length: 35, rewards: 3, points: 120, dateAdded: new Date('2023-10-12'), lastEdited: new Date('2023-10-12'), editedBy: 'Ioana Maria1'},
    { name: 'Angular HTTP Methods', task: 'repair3', link: 'file', fileType: 'Text', length: 45, rewards: 4, points: 140, dateAdded: new Date('2023-10-13'), lastEdited: new Date('2023-10-12'), editedBy: 'Ioana Maria2'},
    { name: 'Agile 101', task: 'repair4',  link: 'file', fileType: 'Text', length: 50, rewards: 5, points: 160, dateAdded: new Date('2023-10-14'), lastEdited: new Date('2023-10-13'), editedBy: 'Ioana Maria3'},
    { name: 'Java', task: 'repair5', link: 'link', fileType: 'Video', length: 55, rewards: 6, points: 200, dateAdded: new Date('2023-10-15'), lastEdited: new Date('2023-10-14'), editedBy: 'Ioana Maria4'},
    { name: 'React', task: "", link: 'file', fileType: 'Text', length: 45, rewards: 4, points: 140, dateAdded: new Date('2023-10-13'), lastEdited: new Date('2023-10-12'), editedBy: 'Ioana Maria2'},
    { name: 'JavaScript', task: 'repair6', link: 'file', fileType: 'Text', length: 50, rewards: 5, points: 160, dateAdded: new Date('2023-10-14'), lastEdited: new Date('2023-10-13'), editedBy: 'Ioana Maria3'},
    { name: 'Router', task: "", link: 'link', fileType: 'Video', length: 55, rewards: 6, points: 200, dateAdded: new Date('2023-10-15'), lastEdited: new Date('2023-10-14'), editedBy: 'Ioana Maria4'},

  ];  

  avatars: Avatar[] = [
    { name: 'Mustas', linked_to: 'Task_Name1', default: true, addedBy: 'Ioana Maria'},
    { name: 'Kewl', linked_to: 'Task_Name2', default: true, addedBy: 'Ioana Maria'},
    { name: 'Mustas', linked_to: 'Task_Name3', default: false, addedBy: 'Ioana Popescu'},
    { name: 'Kewl', linked_to: 'Task_Name4', default: false, addedBy: 'Ioana Maria'},
    { name: 'Mustas', linked_to: 'Task_Name5', default: true, addedBy: 'Ioana Popescu'},
  ];  

  public loadTasks(): Observable<Task[]> {
    return of(this.tasks)
  }

  public loadCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  public loadAvatars(): Observable<Avatar[]> {
    return of(this.avatars);
  }

  setSidenavVisibility(show: boolean): void {
    this.showSidenav = show;
  }

  getShowSidenav(): boolean {
    return this.showSidenav;
  }
  
}