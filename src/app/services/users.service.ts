import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserCard } from '../interfaces/user-card.model';

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

  usersLeaderboard: UserCard[] = [
    {name: 'Bill Ladron', leftDays: 1, points: 300, trophies: 0},
    {name: 'Ramon Sanches', leftDays: 7, points: 350, trophies: 1},
    {name: 'Michael Rain', leftDays: 2, points: 900, trophies: 3},
    {name: 'Frank Joseph', leftDays: 3, points: 700, trophies: 2},
  ]

  usersSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    this.usersRequireAttention
  );

  getUsersRequireAttention(): Observable<User[]> {
    return this.usersSubject$.asObservable();
  }
  updateUsersRequireAttention(users: User[]) {
    this.usersSubject$.next(users);
  }

  getUsersLeaderboard() {
    return this.usersLeaderboard;
  }
}
