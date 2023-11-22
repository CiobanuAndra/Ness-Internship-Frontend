import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/interfaces/users/user';

@Injectable({
  providedIn: 'root'
})
export class UsersProgressService {

  baseUserURL = environment.baseUserURL;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get<User>(`${this.baseUserURL}`);
  }

  filterActiveUsers(): Observable<User[]> {
    return this.getAllUsers().pipe(
      map((resp) =>
        resp.users.filter(
          (user: { hasPlatformAccess: boolean }) => user.hasPlatformAccess === true
        )
      )
    );
  }
}