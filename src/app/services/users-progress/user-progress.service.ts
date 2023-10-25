import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { UsersProgressTable } from '../../interfaces/user-pogress-model';

@Injectable({
  providedIn: 'root'
})
export class UsersProgressService {
  constructor() {}

  allUsers: UsersProgressTable[] = [
    {
      name: 'Alex Muller',
      taskCompleted: 8,
      timeLeft: 4,
      dateRegistered: new Date('2023-10-30'),
    },
    {
      name: 'Eduard Rosu',
      taskCompleted: 2,
      timeLeft: 10,
      dateRegistered: new Date('2023-09-15'),
    },
    {
      name: 'Alex Muller',
      taskCompleted: 15,
      timeLeft: 1,
      dateRegistered: new Date('2023-08-07'),
    },
    {
      name: 'Ioan Bucataru',
      taskCompleted: 2,
      timeLeft: 9,
      dateRegistered: new Date('2023-07-22'),
    },
    {
      name: 'Alex Muller',
      taskCompleted: 7,
      timeLeft: 0,
      dateRegistered: new Date(),
    },
    {
      name: 'Alex Muller',
      taskCompleted: 15,
      timeLeft: 10,
      dateRegistered: new Date(),
    },
    {
      name: 'Magda Paicu',
      taskCompleted: 5,
      timeLeft: 10,
      dateRegistered: new Date(),
    },
    {
      name: 'Alex Muller',
      taskCompleted: 7,
      timeLeft: 7,
      dateRegistered: new Date(),
    },
    {
      name: 'Alex Muller',
      taskCompleted: 14,
      timeLeft: 10,
      dateRegistered: new Date(),
    },
    {
      name: 'Alex Muller',
      taskCompleted: 8,
      timeLeft: 12,
      dateRegistered: new Date(),
    },
    {
      name: 'Eduard Rosu',
      taskCompleted: 9,
      timeLeft: 10,
      dateRegistered: new Date(),
    },
     {
      name: 'Alex Muller',
      taskCompleted: 8,
      timeLeft: 12,
      dateRegistered: new Date(),
    },
    {
      name: 'Eduard Rosu',
      taskCompleted: 9,
      timeLeft: 10,
      dateRegistered: new Date(),
    },

  ];

  getAllUsers(): Observable<UsersProgressTable[]> {
    return of(this.allUsers);
  }

}
