const todoQueryKeys = {
  all: ['todos'] as const,
  lists: () => [...todoQueryKeys.all, 'list'] as const,
  list: (projectId: number) => [...todoQueryKeys.lists(), projectId],
};

export default todoQueryKeys;
