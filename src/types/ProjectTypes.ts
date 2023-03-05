export type Projects = Array<{
    title: string;
    project_id: number;
    number_of_members: number;
    start_date: string;
    due_date: string;
    description?: string;
    user_id: number;
    _count: {
        todo: number;
    };
}>;

export interface Project {
    title?: string;
    project_id?: number;
    number_of_members?: number;
    start_date?: string;
    due_date?: string;
    description?: string;
}

export interface UpdateProject {
    due_date?: string | undefined;
    title?: string | undefined;
    number_of_members?: number | undefined;
    start_date?: string | undefined;
    description?: string;
}
