import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.model';
import { UserCard } from '../interfaces/user-card.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UsersListTable } from '../interfaces/users-list-table';

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
    { status: false, name: 'Bill Van', tasks: 1, points: 1300, rank: 1 },
    { status: false, name: 'Mike Chris', tasks: 2, points: 1200, rank: 2 },
    { status: false, name: 'Aaron Frey', tasks: 3, points: 1100, rank: 3 },
    { status: false, name: 'John Smith', tasks: 4, points: 1000, rank: 4 },
    { status: false, name: 'Valery Greg', tasks: 10, points: 300, rank: 10 },
    { status: false, name: 'Bill Van', tasks: 1, points: 1300, rank: 1 },
    { status: false, name: 'Mike Chris', tasks: 2, points: 1200, rank: 2 },
    { status: false, name: 'Aaron Frey', tasks: 3, points: 1100, rank: 3 },
    { status: false, name: 'John Smith', tasks: 4, points: 1000, rank: 4 },
    { status: false, name: 'Valery Greg', tasks: 10, points: 300, rank: 10 },
    { status: false, name: 'Bill Van', tasks: 1, points: 1300, rank: 1 },
    { status: false, name: 'Mike Chris', tasks: 2, points: 1200, rank: 2 },
  ];

  public loadUsersLeaderboard(): Observable<UserCard[]> {
    return of(this.usersLeaderboard);
  }

  totalCourses: number = 15;

  allUsers: UsersListTable[] = [
    {
      name: 'Alex Muller',
      status: true,
      coursesCompleted: 5,
      leftDays: 10,
      dateAdded: new Date(),
    },
    {
      name: 'Alex Muller',
      status: true,
      coursesCompleted: 5,
      leftDays: 10,
      dateAdded: new Date(),
    },
    {
      name: 'Alex Muller',
      status: false,
      coursesCompleted: 5,
      leftDays: 10,
      dateAdded: new Date(),
    },
    {
      name: 'Alex Muller',
      status: true,
      coursesCompleted: 5,
      leftDays: 10,
      dateAdded: new Date(),
    },
    {
      name: 'Alex Muller',
      status: true,
      coursesCompleted: 5,
      leftDays: 10,
      dateAdded: new Date(),
    },
    {
      name: 'Alex Muller',
      status: true,
      coursesCompleted: 5,
      leftDays: 10,
      dateAdded: new Date(),
    },
    {
      name: 'Alex Muller',
      status: true,
      coursesCompleted: 5,
      leftDays: 10,
      dateAdded: new Date(),
    },
    {
      name: 'Alex Muller',
      status: true,
      coursesCompleted: 5,
      leftDays: 10,
      dateAdded: new Date(),
    },
    {
      name: 'Alex Muller',
      status: false,
      coursesCompleted: 5,
      leftDays: 10,
      dateAdded: new Date(),
    },
    {
      name: 'Alex Muller',
      status: true,
      coursesCompleted: 5,
      leftDays: 10,
      dateAdded: new Date(),
    },
    {
      name: 'Alex Muller',
      status: true,
      coursesCompleted: 5,
      leftDays: 10,
      dateAdded: new Date(),
    },
    {
      name: 'Alex Muller',
      status: true,
      coursesCompleted: 5,
      leftDays: 10,
      dateAdded: new Date(),
    },
  ];

  usersSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    this.usersRequireAttention
  );

  allUsersSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(
    this.allUsers
  );

  getUsersRequireAttention(): Observable<User[]> {
    return this.usersSubject$.asObservable();
  }
  updateUsersRequireAttention(users: User[]) {
    this.usersSubject$.next(users);
  }
  getAllUsers(): Observable<any[]> {
    return this.allUsersSubject$.asObservable();
  }
}
