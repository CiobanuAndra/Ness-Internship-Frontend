import { UserCard } from '../interfaces/users/user-card.model';

const dashboardUserMapper = (payload: any) => {
  return {
    name: `${payload.user.name} ${payload.user.surname}`,
    status: payload.status,
    totalTasks: payload.completedTasks.length + payload.remainingTasks.length,
    completedTasks: payload.completedTasks.length,
    score: payload.score,
    rank: payload.rank,
  };
};

const leaderboardUserMapper = (user: UserCard) => {
  return {
    name: `${user.name} ${user.surname}`,
    totalTasks: user.totalTasks,
    completedTasks: user.completedTasks,
    points: user.score,
    rank: user.rank,
  };
};

export { dashboardUserMapper, leaderboardUserMapper };
