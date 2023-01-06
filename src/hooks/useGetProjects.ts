import { useQuery } from '@tanstack/react-query';
import projectQueryKeys from '../query-keys/projectQueryKeys';

const projects = [
  {
    title: 'project1',
    id: 1,
    number_of_members: 2,
    start_date: '2023/01/01',
    due_date: '2023/02/28',
  },
  {
    title: 'project2',
    id: 2,
    number_of_members: 4,
    start_date: '2023/01/01',
    due_date: '2023/02/28',
  },
  {
    title: 'project3',
    id: 3,
    number_of_members: 5,
    start_date: '2023/01/01',
    due_date: '2023/02/28',
  },
  {
    title: 'project4',
    id: 4,
    number_of_members: 5,
    start_date: '2023/01/01',
    due_date: '2023/02/28',
  },
];

const queryFunction = (): Array<{
  title: string;
  id: number;
  number_of_members: number;
  start_date: string;
  due_date: string;
}> => {
  return projects;
};
const useGetProjects = (): {
  data:
    | Array<{
        title: string;
        id: number;
        number_of_members: number;
        start_date: string;
        due_date: string;
      }>
    | undefined;
  isLoading: boolean;
} => {
  const { data, isLoading } = useQuery({
    queryKey: projectQueryKeys.lists(),
    queryFn: queryFunction,
  });

  return { data, isLoading };
};

export default useGetProjects;
