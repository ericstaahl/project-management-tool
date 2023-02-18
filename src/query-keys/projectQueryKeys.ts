const projectQueryKeys = {
    all: ['projects'] as const,
    lists: () => [...projectQueryKeys.all, 'list'] as const,
    list: (sortBy: string, sortOrder: string) =>
        [...projectQueryKeys.lists(), 'list', sortBy, sortOrder] as const,
};

export default projectQueryKeys;
