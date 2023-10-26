import { Injectable } from '@angular/core';
import { UserRequireAttention } from '../interfaces/user-require-attention.model';
import { UserCard } from '../interfaces/user-card.model';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { UsersListTable } from '../interfaces/users-list-table';
import { UserFromCSVFile } from '../interfaces/user-from-csvfile';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  usersRequireAttention: UserRequireAttention[] = [
    {
      name: 'Andrei Artene',
      leftDays: 4,
      pastDays: 2,
      tasksLeft: 3,
      status: true,
    },
    {
      name: 'Vasile Ion',
      leftDays: 1,
      pastDays: 4,
      tasksLeft: 5,
      status: true,
    },
    {
      name: 'Mark Willerhower',
      leftDays: 2,
      pastDays: 4,
      tasksLeft: 4,
      status: true,
    },
    {
      name: 'Andrei Artene',
      leftDays: 4,
      pastDays: 2,
      tasksLeft: 3,
      status: true,
    },
    {
      name: 'Vasile Ion',
      leftDays: 1,
      pastDays: 4,
      tasksLeft: 5,
      status: true,
    },
    {
      name: 'Mark Willerhower',
      leftDays: 2,
      pastDays: 4,
      tasksLeft: 4,
      status: false,
    },
    {
      name: 'Andrei Artene',
      leftDays: 4,
      pastDays: 2,
      tasksLeft: 3,
      status: true,
    },
    {
      name: 'Vasile Ion',
      leftDays: 1,
      pastDays: 4,
      tasksLeft: 5,
      status: false,
    },
    {
      name: 'Mark Willerhower',
      leftDays: 2,
      pastDays: 4,
      tasksLeft: 4,
      status: true,
    },
    {
      name: 'Andrei Artene',
      leftDays: 4,
      pastDays: 2,
      tasksLeft: 3,
      status: false,
    },
    {
      name: 'Vasile Ion',
      leftDays: 1,
      pastDays: 4,
      tasksLeft: 5,
      status: true,
    },
    {
      name: 'Mark Willerhower',
      leftDays: 2,
      pastDays: 4,
      tasksLeft: 4,
      status: true,
    },
    {
      name: 'Andrei Artene',
      leftDays: 4,
      pastDays: 2,
      tasksLeft: 3,
      status: false,
    },
    {
      name: 'Vasile Ion',
      leftDays: 1,
      pastDays: 4,
      tasksLeft: 5,
      status: true,
    },
    {
      name: 'Mark Willerhower',
      leftDays: 2,
      pastDays: 4,
      tasksLeft: 4,
      status: true,
    },
    {
      name: 'Andrei Artene',
      leftDays: 4,
      pastDays: 2,
      tasksLeft: 3,
      status: false,
    },
    {
      name: 'Vasile Ion',
      leftDays: 1,
      pastDays: 4,
      tasksLeft: 5,
      status: true,
    },
    {
      name: 'Mark Willerhower',
      leftDays: 2,
      pastDays: 4,
      tasksLeft: 4,
      status: false,
    },
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

  totalCourses: number = 15;

  allUsers: UsersListTable[] = [
    {
      name: 'Alex Muller',
      status: true,
      coursesCompleted: 8,
      leftDays: 4,
      dateAdded: new Date('2023-10-30'),
    },
    {
      name: 'Eduard Rosu',
      status: true,
      coursesCompleted: 2,
      leftDays: 10,
      dateAdded: new Date('2023-09-15'),
    },
    {
      name: 'Alex Muller',
      status: false,
      coursesCompleted: 15,
      leftDays: 1,
      dateAdded: new Date('2023-08-07'),
    },
    {
      name: 'Ioan Bucataru',
      status: true,
      coursesCompleted: 2,
      leftDays: 9,
      dateAdded: new Date('2023-07-22'),
    },
    {
      name: 'Alex Muller',
      status: true,
      coursesCompleted: 7,
      leftDays: 0,
      dateAdded: new Date(),
    },
    {
      name: 'Alex Muller',
      status: false,
      coursesCompleted: 15,
      leftDays: 10,
      dateAdded: new Date(),
    },
    {
      name: 'Magda Paicu',
      status: true,
      coursesCompleted: 5,
      leftDays: 10,
      dateAdded: new Date(),
    },
    {
      name: 'Alex Muller',
      status: true,
      coursesCompleted: 7,
      leftDays: 7,
      dateAdded: new Date(),
    },
    {
      name: 'Alex Muller',
      status: false,
      coursesCompleted: 14,
      leftDays: 10,
      dateAdded: new Date(),
    },
    {
      name: 'Alex Muller',
      status: true,
      coursesCompleted: 8,
      leftDays: 12,
      dateAdded: new Date(),
    },
    {
      name: 'Eduard Rosu',
      status: true,
      coursesCompleted: 9,
      leftDays: 10,
      dateAdded: new Date(),
    },
    {
      name: 'Florin Bodogan',
      status: true,
      coursesCompleted: 11,
      leftDays: 3,
      dateAdded: new Date(),
    },
    {
      name: 'Andra Ciobanu',
      status: true,
      coursesCompleted: 2,
      leftDays: 15,
      dateAdded: new Date(),
    },
    {
      name: 'Vlad Cristea',
      status: true,
      coursesCompleted: 3,
      leftDays: 6,
      dateAdded: new Date(),
    },
    {
      name: 'Andra Ciobanu',
      status: false,
      coursesCompleted: 5,
      leftDays: 10,
      dateAdded: new Date(),
    },
  ];

  usersFromCSVFile: UserFromCSVFile[] = [
    { firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com' },
    { firstname: 'Jane', lastname: 'Smith', email: 'jane.smith@example.com' },
  ];

  usersSubject$: BehaviorSubject<UserRequireAttention[]> = new BehaviorSubject<
    UserRequireAttention[]
  >(this.usersRequireAttention);

  getUsersRequireAttention(): Observable<UserRequireAttention[]> {
    return this.usersSubject$.asObservable();
  }

  updateUsersRequireAttention(users: UserRequireAttention[]) {
    this.usersSubject$.next(users);
  }

  public loadUsersLeaderboard(): Observable<UserCard[]> {
    return of(this.usersLeaderboard);
  }

  getAllUsers(): Observable<UsersListTable[]> {
    return of(this.allUsers);
  }

  getUsersFromCSVFile(): Observable<UserFromCSVFile[]> {
    return of(this.usersFromCSVFile);
  }

  getInactiveUsers(): Observable<UsersListTable[]> {
    return of(this.allUsers).pipe(
      map((users) => users.filter((user) => user.status === false))
    );
  }
  getActiveUsers(): Observable<UsersListTable[]> {
    return of(this.allUsers).pipe(
      map((users) => users.filter((user) => user.status === true))
    );
  }
  filterActiveUsersRequireAttention(): Observable<UserRequireAttention[]> {
    return of(this.usersRequireAttention).pipe(
      map((users) => users.filter((user) => user.status === true))
    );
  }
  filterInactiveUsersRequireAttention(): Observable<UserRequireAttention[]> {
    return of(this.usersRequireAttention).pipe(
      map((users) => users.filter((user) => user.status === false))
    );
  }
}
