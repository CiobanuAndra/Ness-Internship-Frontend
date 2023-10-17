export interface Task {
    icon: string;
    name: string;
    type: string;
    courses: string;
    order: number;
    length: number;
    rewards: number;
    dateAdded: Date;
    lastEdited: Date;
    editedBy: string;
  }