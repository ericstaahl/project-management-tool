import styled from '@emotion/styled';
import React from 'react';

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

const Project = styled.div({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '0.5rem',
  borderRadius: '5px',
  minHeight: '200px',
  backgroundColor: '#363942',
  padding: '1rem',
});

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

const HomePage: React.FC = () => {
  return (
    <Container>
      <h1 style={{ padding: '1rem 0 1rem 1rem' }}>Dashboard</h1>
      <GridContainer>
        {projects?.map((project) => (
          <Project key={project.id}>
            <h3>{project.title}</h3>
            <div>{`Number of members: ${project.number_of_members}`}</div>
            <div>{`Start date: ${project.start_date}`}</div>
            <div>{`Due date: ${project.due_date}`}</div>
          </Project>
        ))}
      </GridContainer>
    </Container>
  );
};

export default HomePage;
