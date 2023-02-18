const todoQueryKeys = {
    all: ['todos'] as const,
    lists: () => [...todoQueryKeys.all, 'list'] as const,
    list: (projectId: number, sortBy: string, statusFilter: string | null) => [
        ...todoQueryKeys.lists(),
        projectId,
        sortBy,
        statusFilter,
    ],
};

export default todoQueryKeys;
