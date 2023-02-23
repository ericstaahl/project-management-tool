const projectQueryKeys = {
    all: ['projects'] as const,
    lists: () => [...projectQueryKeys.all, 'list'] as const,
    list: (sortBy: string, sortOrder: string) =>
        [...projectQueryKeys.lists(), 'list', sortBy, sortOrder] as const,
    details: () => [...projectQueryKeys.all, 'details'],
    detail: (projectId: string | undefined) => [
        ...projectQueryKeys.details(),
        projectId,
    ],
};

export default projectQueryKeys;
