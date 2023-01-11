import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import useGetProjects from '../hooks/useGetProjects';

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

const HomePage: React.FC = () => {
  const { isLoading, data: projects } = useGetProjects();
  return (
    <Container>
      <h2 style={{ padding: '1rem 0 1rem 1rem' }}>Dashboard</h2>
      <GridContainer>
        {!isLoading &&
          projects?.map((project) => (
            <Project key={project.project_id}>
              <h3>{project.title}</h3>
              {project.number_of_members > 0 ? (
                <div>{`Number of members: ${project.number_of_members}`}</div>
              ) : (
                <></>
              )}
              <div>{`Start date: ${new Date(
                project.start_date
              ).toLocaleDateString('sv-SE')}`}</div>
              <div>{`Due date: ${new Date(project.due_date).toLocaleDateString(
                'sv-SE'
              )}`}</div>
              <Link
                style={{ color: 'white' }}
                to={`/projects/${project.project_id}`}
              >
                See more
              </Link>
            </Project>
          ))}
      </GridContainer>
    </Container>
  );
};

export default HomePage;
