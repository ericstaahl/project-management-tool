export type Todos = Array<{
  todo_id: number;
  title: string;
  estimate: string;
  description: string;
  project_id: number;
}>;

export interface Todo {
  todo_id?: number | undefined;
  title: string;
  estimate: string;
  description: string;
  project_id: number;
}
