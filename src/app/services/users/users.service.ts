import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { UsersListTable } from '../../interfaces/users-list-table';
import { UserModal } from '../../interfaces/users/user-modal.model';
import { environment } from 'src/environments/environment';
import { UserResponse } from 'src/app/interfaces/user-response';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/users/user';
import { UserRequireAttention } from 'src/app/interfaces/user-require-attention.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUserURL = environment.baseUserURL;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get<User>(`${this.baseUserURL}`);
  }

  filterActiveUsers(): Observable<User[]> {
    return this.getAllUsers().pipe(
      map((resp) =>
        resp.users.filter(
          (user: { isDeactivated: boolean }) => user.isDeactivated === true
        )
      )
    );
  }

  filterInactiveUsers(): Observable<User[]> {
    return this.getAllUsers().pipe(
      map((resp) =>
        resp.users.filter(
          (user: { isDeactivated: boolean }) => user.isDeactivated === false
        )
      )
    );
  }

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
  ];

  getUsersFromCSVFile(): Observable<UsersListTable[]> {
    return of(this.usersFromCSVFile);
  }

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

  addNewUser(userData: UserModal, userId: string): Observable<UserModal> {
    return this.http.post<UserModal>(
      `${this.baseUserURL}/admin?id=${userId}`,
      userData
    );
  }

  getAllUsersAPI(): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.baseUserURL, {
      responseType: 'json',
    });
  }

  async uploadCSVFile(file: File) {
    try {
      const formData = new FormData();
      formData.append('csvFile', file);

      const response = await fetch(`${environment.baseUserURL}/extract`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);
        return data;
      } else {
        throw new Error('Error loading file.');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  getUsersRequireAttention(): Observable<UserRequireAttention[]> {
    return of(this.usersRequireAttention);
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
