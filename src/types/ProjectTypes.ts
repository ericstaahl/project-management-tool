import { CommentWithProjectId } from '../components/CommentSection';

export interface Member {
    id: number;
    project_id: number;
    role: string;
    user_id: number;
    username: string;
}

export type Projects = Array<{
    title: string;
    project_id: number;
    start_date: string;
    due_date: string;
    description?: string;
    user_id: number;
    complete: boolean;
    members?: Member[];
    _count: {
        todo: number;
        members: number;
    };
}>;

export interface Project {
    title: string;
    project_id: number;
    start_date: string;
    due_date: string;
    description?: string;
    user_id: number;
    complete: boolean;
    members?: Member[];
    _count: {
        todo: number;
        members: number;
    };
    project_comment: CommentWithProjectId[];
}

export interface UpdateProject {
    due_date?: string | undefined;
    title?: string | undefined;
    start_date?: string | undefined;
    description?: string;
    complete?: boolean;
}
