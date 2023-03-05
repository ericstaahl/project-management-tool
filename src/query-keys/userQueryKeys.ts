const todoQueryKeys = {
    all: ['users'] as const,
    lists: () => [...todoQueryKeys.all, 'list'] as const,
    list: (projectId: number | undefined) => [
        ...todoQueryKeys.lists(),
        projectId,
    ],
};

export default todoQueryKeys;
