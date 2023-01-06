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
  gridColumn: '1 / 1',
  columnGap: '1rem',
  rowGap: '1rem',
});

const Project = styled.div({
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
  },
  {
    title: 'project2',
    id: 2,
    number_of_members: 4,
  },
  {
    title: 'project3',
    id: 3,
    number_of_members: 5,
  },
  {
    title: 'project4',
    id: 4,
    number_of_members: 5,
  },
];

const HomePage: React.FC = () => {
  return (
    <div>
      <Container>
        <h1>Dashboard</h1>
        <GridContainer>
          {projects?.map((project) => (
            <Project key={project.id}>
              <h3>{project.title}</h3>
              <div>{`Number of members: ${project.number_of_members}`}</div>
            </Project>
          ))}
          <Project></Project>
        </GridContainer>
      </Container>
    </div>
  );
};

export default HomePage;
