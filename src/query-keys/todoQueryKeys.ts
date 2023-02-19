const todoQueryKeys = {
    all: ['todos'] as const,
    lists: () => [...todoQueryKeys.all, 'list'] as const,
    list: (
        projectId: number,
        sortBy: string,
        statusFilter: string | null,
        sortOrder: string
    ) => [...todoQueryKeys.lists(), projectId, sortBy, statusFilter, sortOrder],
};

export default todoQueryKeys;
