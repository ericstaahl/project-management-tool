const todoQueryKeys = {
    all: ['todos'] as const,
    lists: () => [...todoQueryKeys.all, 'list'] as const,
    list: (
        projectId: number,
        sortBy: string,
        statusFilter: string | null,
        sortOrder: string
    ) => [...todoQueryKeys.lists(), projectId, sortBy, statusFilter, sortOrder],
    details: () => [...todoQueryKeys.all, 'details'],
    detail: (projectId: string | undefined, todoId: string | undefined) => [
        ...todoQueryKeys.details(),
        projectId,
        todoId,
    ],
};

export default todoQueryKeys;
