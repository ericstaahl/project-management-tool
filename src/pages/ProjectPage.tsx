import styled from '@emotion/styled';
import React from 'react';
import { useParams } from 'react-router-dom';
import useGetTodos from '../hooks/useGetTodos';

const Container = styled.div({
  borderRadius: '5px',
  backgroundColor: '#1c1c1c',
  margin: '1rem',
  padding: '2rem',
});

const GridContainer = styled.div({
  display: 'grid',
  padding: '1rem',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  columnGap: '1rem',
  rowGap: '1rem',
});

const Todo = styled.div({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '0.5rem',
  borderRadius: '5px',
  minHeight: '200px',
  backgroundColor: '#363942',
  padding: '1rem',
});

const ProjectPage: React.FC = () => {
  const { id: projectId } = useParams();
  const { data, isLoading } = useGetTodos(Number(projectId));

  return (
    <Container>
      <h2 style={{ padding: '1rem 0 1rem 1rem' }}>Project</h2>
      <GridContainer>
        {!isLoading &&
          data?.map((todo) => (
            <Todo key={todo.todo_id}>
              <h3>{`${todo.title}`}</h3>
              <div>{`Estimation: ${todo.estimate}`}</div>
              <div>{`Description: ${todo.description}`}</div>
            </Todo>
          ))}
      </GridContainer>
    </Container>
  );
};

export default ProjectPage;
