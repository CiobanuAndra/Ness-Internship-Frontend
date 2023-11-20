export interface Task {
    icon: string;
    title: string;
    type: string;
    courses: string;
    position: number;
    duration: number;
    rewardQuantity: number;
    dateCreated: Date;
    lastEdited: Date;
    editedBy: string;
  }