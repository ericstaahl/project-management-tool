export type Todos = Array<{
    todo_id: number;
    title: string;
    estimate: string;
    description: string;
    project_id: number;
    assignee?: string | null;
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE';
}>;

export interface Todo {
    todo_id?: number | undefined;
    title: string;
    estimate: string;
    description: string;
    project_id: number;
    assignee?: string | null;
    status?: 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE';
}

export interface FetchedTodo {
    todo_id: number;
    title: string;
    estimate: string;
    description: string;
    project_id: number;
    assignee?: string | null;
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE';
}

export interface UpdatedTodo {
    title?: string;
    estimate?: string;
    description?: string;
    assignee?: string | null;
}
