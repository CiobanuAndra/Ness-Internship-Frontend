import { Injectable } from '@angular/core';
import { Task } from '../interfaces/resources/task.model';
import { Observable, of } from 'rxjs';
import { Course } from '../interfaces/resources/course.model';
import { Avatar } from '../interfaces/resources/avatar.model';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor() { }

  tasks: Task[] = [
    { icon: '../../../assets/icons/Ellipse.svg', name: 'repair1', type: 'easy', courses: 'kung-fu', order: 3, length: 1230, rewards: 2, dateAdded: new Date('2023-10-11'), lastEdited: new Date('2023-10-11'), editedBy: 'Ioana Maria'},
    { icon: '../../../assets/icons/file.svg', name: 'repair2', type: 'mid', courses: 'jujitsu', order: 32, length: 1202, rewards: 2, dateAdded: new Date('2023-10-15'), lastEdited: new Date('2023-10-15'), editedBy: 'Irina Nistor'},
    { icon: '../../../assets/icons/Ellipse.svg', name: 'repair1', type: 'easy', courses: 'kung-fu', order: 3, length: 1230, rewards: 2, dateAdded: new Date('2023-10-11'), lastEdited: new Date('2023-10-11'), editedBy: 'Ioana Maria'},
    { icon: '../../../assets/icons/file.svg', name: 'repair2', type: 'mid', courses: 'jujitsu', order: 32, length: 1202, rewards: 2, dateAdded: new Date('2023-10-15'), lastEdited: new Date('2023-10-15'), editedBy: 'Irina Nistor'},
    { icon: '../../../assets/icons/Ellipse.svg', name: 'repair1', type: 'easy', courses: 'kung-fu', order: 3, length: 1230, rewards: 2, dateAdded: new Date('2023-10-11'), lastEdited: new Date('2023-10-11'), editedBy: 'Ioana Maria'},
    { icon: '../../../assets/icons/file.svg', name: 'repair2', type: 'mid', courses: 'jujitsu', order: 32, length: 1202, rewards: 2, dateAdded: new Date('2023-10-15'), lastEdited: new Date('2023-10-15'), editedBy: 'Irina Nistor'},
  ];  

  courses: Course[] = [
    { name: 'repair1', link: 'file', fileType: 'kung-fu', length: 1230, rewards: 2, dateAdded: new Date('2023-10-11'), lastEdited: new Date('2023-10-11'), editedBy: 'Ioana Maria'},
    { name: 'repair2', link: 'file', fileType: 'kung-fu', length: 1231, rewards: 3, dateAdded: new Date('2023-10-12'), lastEdited: new Date('2023-10-12'), editedBy: 'Ioana Maria1'},
    { name: 'repair3', link: 'file', fileType: 'kung-fu', length: 1232, rewards: 4, dateAdded: new Date('2023-10-13'), lastEdited: new Date('2023-10-12'), editedBy: 'Ioana Maria2'},
    { name: 'repair4', link: 'file', fileType: 'kung-fu', length: 1233, rewards: 5, dateAdded: new Date('2023-10-14'), lastEdited: new Date('2023-10-13'), editedBy: 'Ioana Maria3'},
    { name: 'repair5', link: 'link', fileType: 'kung-fu', length: 1234, rewards: 6, dateAdded: new Date('2023-10-15'), lastEdited: new Date('2023-10-14'), editedBy: 'Ioana Maria4'},

  ];  

  avatars: Avatar[] = [
    { name: 'Mustas', linked_to: 'Task_Name', default: true, addedBy: 'Ioana Maria'},
    { name: 'Kewl', linked_to: 'Task_Name', default: true, addedBy: 'Ioana Maria'},
    { name: 'Mustas', linked_to: 'Task_Name', default: false, addedBy: 'Ioana Popescu'},
    { name: 'Kewl', linked_to: 'Task_Name', default: false, addedBy: 'Ioana Maria'},
    { name: 'Mustas', linked_to: 'Task_Name', default: true, addedBy: 'Ioana Popescu'},
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
  
}