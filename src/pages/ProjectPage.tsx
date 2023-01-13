import styled from '@emotion/styled';
import React from 'react';
import { useParams } from 'react-router-dom';
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

const ProjectPage: React.FC = () => {
  const { id: projectId } = useParams();
  const { data, isLoading } = useGetTodos(Number(projectId));

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
            </Card>
          ))}
      </GridContainer>
    </Container>
  );
};

export default ProjectPage;
