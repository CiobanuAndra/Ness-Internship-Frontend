import { UserCard } from '../interfaces/users/user-card.model';

const dashboardUserMapper = (user: UserCard) => {
  return {
    name: user.name,
    status: user.totalTasks - user.completedTasks === 0,
    totalTasks: user.totalTasks,
    completedTasks: user.completedTasks,
    points: user.score,
    rank: user.rank,
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
