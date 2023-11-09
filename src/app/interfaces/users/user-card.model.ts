export interface UserCard {
    status: boolean;
    name: string;
    surname?: string,
    totalTasks: number;
    completedTasks: number;
    score: number;
    rank: number;
  }