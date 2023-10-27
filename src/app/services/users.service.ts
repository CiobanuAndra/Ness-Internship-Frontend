import { Injectable } from '@angular/core';
import { UserRequireAttention } from '../interfaces/user-require-attention.model';
import { UserCard } from '../interfaces/user-card.model';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { UsersListTable } from '../interfaces/users-list-table';

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
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'john.doe@example.com',
      status: true,
      coursesCompleted: 8,
      leftDays: 5,
      dateAdded: new Date('2023-10-15'),
    },
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'alice.smith@example.com',
      status: false,
      coursesCompleted: 3,
      leftDays: 12,
      dateAdded: new Date('2023-09-20'),
    },
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'david.johnson@example.com',
      status: true,
      coursesCompleted: 12,
      leftDays: 2,
      dateAdded: new Date('2023-10-01'),
    },
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'emily.brown@example.com',
      status: false,
      coursesCompleted: 5,
      leftDays: 8,
      dateAdded: new Date('2023-08-10'),
    },
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'michael.wilson@example.com',
      status: true,
      coursesCompleted: 10,
      leftDays: 4,
      dateAdded: new Date('2023-10-05'),
    },
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'john.doe@example.com',
      status: true,
      coursesCompleted: 8,
      leftDays: 5,
      dateAdded: new Date('2023-10-15'),
    },
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'alice.smith@example.com',
      status: false,
      coursesCompleted: 3,
      leftDays: 12,
      dateAdded: new Date('2023-09-20'),
    },
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'david.johnson@example.com',
      status: true,
      coursesCompleted: 12,
      leftDays: 2,
      dateAdded: new Date('2023-10-01'),
    },
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'emily.brown@example.com',
      status: false,
      coursesCompleted: 5,
      leftDays: 8,
      dateAdded: new Date('2023-08-10'),
    },
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'michael.wilson@example.com',
      status: true,
      coursesCompleted: 10,
      leftDays: 4,
      dateAdded: new Date('2023-10-05'),
    },
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'john.doe@example.com',
      status: true,
      coursesCompleted: 8,
      leftDays: 5,
      dateAdded: new Date('2023-10-15'),
    },
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'alice.smith@example.com',
      status: false,
      coursesCompleted: 3,
      leftDays: 12,
      dateAdded: new Date('2023-09-20'),
    },
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'david.johnson@example.com',
      status: true,
      coursesCompleted: 12,
      leftDays: 2,
      dateAdded: new Date('2023-10-01'),
    },
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'emily.brown@example.com',
      status: false,
      coursesCompleted: 5,
      leftDays: 8,
      dateAdded: new Date('2023-08-10'),
    },
  ];

  usersFromCSVFile: UsersListTable[] = [
    {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      status: true,
      coursesCompleted: 10,
      leftDays: 4,
      dateAdded: new Date('2023-10-05'),
    },
    {
      firstname: 'Jane',
      lastname: 'Smith',
      email: 'jane.smith@example.com',
      status: true,
      coursesCompleted: 10,
      leftDays: 4,
      dateAdded: new Date('2023-10-05'),
    },
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

  getUsersFromCSVFile(): Observable<UsersListTable[]> {
    return of(this.usersFromCSVFile);
  }

  uploadCSVFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
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
