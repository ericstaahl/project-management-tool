const todoQueryKeys = {
    all: ['todos'] as const,
    lists: () => [...todoQueryKeys.all, 'list'] as const,
    list: (projectId: number, sortBy: string) => [
        ...todoQueryKeys.lists(),
        projectId,
        sortBy,
    ],
};

export default todoQueryKeys;
