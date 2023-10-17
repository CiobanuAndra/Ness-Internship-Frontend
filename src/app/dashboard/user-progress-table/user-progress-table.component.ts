import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-user-progress-table',
  templateUrl: './user-progress-table.component.html',
  styleUrls: ['./user-progress-table.component.scss']
})
export class UserProgressTableComponent {
  displayedColumns = ['name', 'task completed', 'time', 'Date Registered'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}

export interface Element {
  name: string;
  taskCompleted: number;
  time: string;
  dateRegistered: string;
}

const ELEMENT_DATA: Element[] = [
  { name: 'Alex Muller', taskCompleted: 1.0079, time: 'H', dateRegistered:'date'},
  { name: 'Alex Muller', taskCompleted: 4.0026, time: 'He', dateRegistered:'date'},
  { name: 'Alex Muller', taskCompleted: 6.941, time: 'Li', dateRegistered:'date'},
  { name: 'Alex Muller', taskCompleted: 9.0122, time: 'Be', dateRegistered:'date'},
  { name: 'Alex Muller', taskCompleted: 10.811, time: 'B', dateRegistered:'date'},
  { name: 'Alex Muller', taskCompleted: 12.0107, time: 'C', dateRegistered:'date'},
  { name: 'Alex Muller', taskCompleted: 14.0067, time: 'N', dateRegistered:'date'},
  { name: 'Alex Muller', taskCompleted: 15.9994, time: 'O', dateRegistered:'date'},
  { name: 'Alex Muller', taskCompleted: 18.9984, time: 'F', dateRegistered:'date'},
  { name: 'Alex Muller', taskCompleted: 20.1797, time: 'Ne', dateRegistered:'date'},
  { name: 'Alex Muller', taskCompleted: 22.9897, time: 'Na', dateRegistered:'date'},
  { name: 'Alex Muller', taskCompleted: 24.305, time: 'Mg', dateRegistered:'date'},
  { name: 'Alex Muller', taskCompleted: 26.9815, time: 'Al', dateRegistered:'date'},
  { name: 'Alex Muller', taskCompleted: 28.0855, time: 'Si', dateRegistered:'date'},
  { name: 'Alex Muller', taskCompleted: 30.9738, time: 'P', dateRegistered:'date'},
  { name: 'Alex Muller', taskCompleted: 32.065, time: 'S', dateRegistered:'date'},
  { name: 'Alex Muller', taskCompleted: 35.453, time: 'Cl', dateRegistered:'date'},
  { name: 'Alex Muller', taskCompleted: 39.948, time: 'Ar', dateRegistered:'date'},
  { name: 'Alex Muller', taskCompleted: 39.0983, time: 'K', dateRegistered:'date'},
  { name: 'Alex Muller', taskCompleted: 40.078, time: 'Ca', dateRegistered:'date'},
];

