import { UserCard } from "./users/user-card.model";

export interface UserResponse {
    message: string,
    users: UserCard[],
}