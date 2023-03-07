const userQueryKeys = {
    all: ['users'] as const,
    lists: () => [...userQueryKeys.all, 'list'] as const,
    list: (projectId: number | undefined) => [
        ...userQueryKeys.lists(),
        projectId,
    ],
};

export default userQueryKeys;
