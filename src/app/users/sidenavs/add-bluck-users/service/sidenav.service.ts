import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  constructor() {}

  // private isSidenavOpenSubject = new BehaviorSubject<boolean>(false);
  // isSidenavOpen$ = this.isSidenavOpenSubject.asObservable();

  // openSidenav() {
  //   this.isSidenavOpenSubject.next(true);
  // }

  // closeSidenav() {
  //   this.isSidenavOpenSubject.next(false);
  // }

  private isSidenavOpen = false;

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  isSidenavOpened() {
    return this.isSidenavOpen;
  }
}
