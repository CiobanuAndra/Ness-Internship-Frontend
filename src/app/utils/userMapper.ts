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

export { dashboardUserMapper };
