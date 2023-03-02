const todoQueryKeys = {
    all: ['users'] as const,
    lists: () => [...todoQueryKeys.all, 'list'] as const,
    list: () => [...todoQueryKeys.lists()],
};

export default todoQueryKeys;
