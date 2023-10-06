import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  usersRequireAttention: User[] = [
    { name: 'Andrei Artene', leftDays: 4, pastDays: 2 },
    { name: 'Vasile Ion', leftDays: 1, pastDays: 4 },
    { name: 'Mark Willerhower', leftDays: 2, pastDays: 4 },
  ];

  usersSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    this.usersRequireAttention
  );

  getUsersRequireAttention(): Observable<User[]> {
    return this.usersSubject$.asObservable();
  }
  updateUsersRequireAttention(users: User[]) {
    this.usersSubject$.next(users);
  }
}
