const projectQueryKeys = {
    all: ['projects'] as const,
    lists: () => [...projectQueryKeys.all, 'list'] as const,
    list: (sortBy: string) =>
        [...projectQueryKeys.lists(), 'list', sortBy] as const,
};

export default projectQueryKeys;
