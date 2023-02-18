const projectQueryKeys = {
    all: ['projects'] as const,
    lists: (sortBy: string) =>
        [...projectQueryKeys.all, 'list', sortBy] as const,
};

export default projectQueryKeys;
