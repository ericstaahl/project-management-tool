export type Projects = Array<{
  title: string;
  project_id: number;
  number_of_members: number;
  start_date: string;
  due_date: string;
}>;

export interface Project {
  title?: string;
  project_id?: number;
  number_of_members?: number;
  start_date?: string;
  due_date?: string;
}
