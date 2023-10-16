import { UsersFilter } from '../enums/users-filter';

export interface UsersListTable {
  name: string;
  status: boolean;
  coursesCompleted: number;
  leftDays: number;
  dateAdded: Date;
}
