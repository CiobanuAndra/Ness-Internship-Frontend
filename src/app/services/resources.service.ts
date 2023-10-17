import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor() { }

  tasks: Task[] = [
    {
      icon: '../../../assets/icons/Ellipse.svg',
      name: 'repair1',
      type: 'easy',
      courses: 'kung-fu',
      order: 3,
      length: 1230,
      rewards: 2,
      dateAdded: new Date('2023-10-11'),
      lastEdited: new Date('2023-10-11'),
      editedBy: 'Ioana Maria'
    },
    {
      icon: '../../../assets/icons/file.svg',
      name: 'repair2',
      type: 'mid',
      courses: 'jujitsu',
      order: 32,
      length: 1202,
      rewards: 2,
      dateAdded: new Date('2023-10-15'),
      lastEdited: new Date('2023-10-15'),
      editedBy: 'Irina Nistor'
    },
    {
      icon: '../../../assets/icons/file.svg',
      name: 'repair3',
      type: 'hard',
      courses: 'taekwondo',
      order: 31,
      length: 1420,
      rewards: 2,
      dateAdded: new Date('2023-10-22'),
      lastEdited: new Date('2023-10-22'),
      editedBy: 'Traian Morutan'
    },
    {
      icon: '../../../assets/icons/clock.svg',
      name: 'repair4',
      type: 'hard',
      courses: 'karate',
      order: 36,
      length: 12320,
      rewards: 2,
      dateAdded: new Date('2023-10-31'),
      lastEdited: new Date('2023-10-31'),
      editedBy: 'Raluca Denisa'
    },
  ];  

  public loadTasks(): Observable<Task[]> {
    return of(this.tasks)
  }
  
}
