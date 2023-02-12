import styled from '@emotion/styled';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/styled/Button';
import Card from '../components/styled/Card';
import Container from '../components/styled/Container';
import useGetTodos from '../hooks/todo/useGetTodos';

const GridContainer = styled.div({
  display: 'grid',
  padding: '1rem',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  columnGap: '1rem',
  rowGap: '1rem',
});

const statuses = {
  NOT_STARTED: 'Not started',
  IN_PROGRESS: 'In progress',
  DONE: 'Done',
};

const ProjectPage: React.FC = () => {
  const { id: projectId } = useParams();
  const { data, isLoading } = useGetTodos(Number(projectId));
  console.log('Todos:', data);
  const navigate = useNavigate();

  return (
    <Container>
      <h2 style={{ padding: '1rem 0 1rem 1rem' }}>Project</h2>
      <GridContainer>
        {!isLoading &&
          data?.map((todo) => (
            <Card key={todo.todo_id}>
              <h3>{`${todo.title}`}</h3>
              <div>{`Estimation: ${todo.estimate}`}</div>
              <div>{`Description: ${todo.description}`}</div>
              <div>{`Status: ${statuses[todo.status]}`}</div>
            </Card>
          ))}
      </GridContainer>
      <Button
        onClick={() => {
          navigate('new-todo');
        }}
      >
        Add to-do
      </Button>
    </Container>
  );
};

export default ProjectPage;
