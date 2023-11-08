import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { UsersListTable } from '../../interfaces/users-list-table';
import { UserModal } from '../../interfaces/users/user-modal.model';
import { environment } from 'src/environments/environment';
import { UserResponse } from 'src/app/interfaces/user-response';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/users/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  urlAddUser = environment.baseUserURL;
  baseUrl = environment.baseUserURL;

  private showSidenav = false;
  getUsersURL = 'http://localhost:3000/api/user';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<User>(`${this.baseUrl}`);
  }

  getUsersRequireAttention(): Observable<any> {
    return this.http.get<User>(`${this.baseUrl}`);
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
    return this.http.post<UserModal>(
      `${this.urlAddUser}/admin?id=${userId}`,
      userData
    );
  }

  getAllUsersAPI(): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.getUsersURL, {
      responseType: 'json',
    });
  }
}
