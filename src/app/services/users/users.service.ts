import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import { UsersListTable } from '../../interfaces/users-list-table';
import { UserCard } from '../../interfaces/users/user-card.model';
import { UserModal } from '../../interfaces/users/user-modal.model';
import { UserRequireAttention } from '../../interfaces/user-require-attention.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  //ENDPOINTS
  urlAddUser = environment.baseUserURL;

  private showSidenav = false;
  getUsersURL = 'http://localhost:3000/api/user';
  constructor(private http: HttpClient) {}

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

  totalCourses: number = 15;

  allUsers: UsersListTable[] = [
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'allex.muller@example.com',
      status: true,
      coursesCompleted: 8,
      leftDays: 5,
      dateAdded: new Date('2023-10-15'),
    },
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'allex.muller@example.com',
      status: false,
      coursesCompleted: 3,
      leftDays: 12,
      dateAdded: new Date('2023-09-20'),
    },
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'allex.muller@example.com',
      status: true,
      coursesCompleted: 12,
      leftDays: 2,
      dateAdded: new Date('2023-10-01'),
    },
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'allex.muller@example.com',
      status: true,
      coursesCompleted: 8,
      leftDays: 5,
      dateAdded: new Date('2023-10-15'),
    },
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'allex.muller@example.com',
      status: false,
      coursesCompleted: 3,
      leftDays: 12,
      dateAdded: new Date('2023-09-20'),
    },
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'allex.muller@example.com',
      status: true,
      coursesCompleted: 12,
      leftDays: 2,
      dateAdded: new Date('2023-10-01'),
    },
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'allex.muller@example.com',
      status: true,
      coursesCompleted: 8,
      leftDays: 5,
      dateAdded: new Date('2023-10-15'),
    },
  ];

  usersFromCSVFile: UsersListTable[] = [
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'allex.muller@example.com',
      status: true,
      coursesCompleted: 8,
      leftDays: 5,
      dateAdded: new Date('2023-10-15'),
    },
    {
      firstname: 'Alex',
      lastname: 'Muller',
      email: 'allex.muller@example.com',
      status: false,
      coursesCompleted: 3,
      leftDays: 12,
      dateAdded: new Date('2023-09-20'),
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
  //modals
  usersModalRequire: UserModal[] = [
    {
      name: 'Mustas1',
      surname: 'Abdul1',
      email: '1412421@ness.com',
      message: 'No Email Adress',
    },
    {
      name: 'Mustas2',
      surname: 'Abdul2',
      email: '1512512@ness.com',
      message: 'No Email Adress',
    },
    {
      name: 'Mustas2',
      surname: 'Abdul2',
      email: '1512512@ness.com',
      message: 'No Email Adress',
    },
  ];

  usersModalAwait: UserModal[] = [
    { name: 'Mustas1', surname: 'Abdul1', email: '15132512@ness.com' },
    { name: 'Mustas2', surname: 'Abdul2', email: '15132512@ness.com' },
    { name: 'Mustas3', surname: 'Abdul', email: '15125512@ness.com' },
    { name: 'Mustas', surname: 'Rajesh', email: '15125412@ness.com' },
  ];

  public loadUsersRequireModal(): Observable<UserModal[]> {
    return of(this.usersModalRequire);
  }

  public loadUsersAwaitModal(): Observable<UserModal[]> {
    return of(this.usersModalAwait);
  }

  //HTTP REQUESTS
  addNewUser(userData: UserModal, userId: string): Observable<UserModal> {
    return this.http.post<UserModal>(`${this.urlAddUser}/admin?id=${userId}`, userData);
  };

  getTotalCourses() {
    return of(this.totalCourses);
  }

  getAllUsersAPI(): Observable<UserCard> {
    return this.http.get<UserCard>(this.getUsersURL, { responseType: 'json' });
  }
  
}
