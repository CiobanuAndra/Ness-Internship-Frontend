import { Roles } from 'src/app/enums/Roles';

export interface User {
  id?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  email?: string;
  password?: string;
  surname?: string;
  photoStringUrl?: string;
  role?: Roles;
  hasPlatformAccess?: boolean;
  isDeactivated?: boolean;
  activationStartDate?: Date;
  activationEndDate?: Date;
  totalTasks?: number;
  completedTasks?: number;
  score?: number;
  rank?: number;
}
