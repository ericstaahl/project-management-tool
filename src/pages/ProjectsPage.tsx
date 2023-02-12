import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/styled/Card';
import Container from '../components/styled/Container';
import useGetProjects from '../hooks/project/useGetProjects';

const GridContainer = styled.div({
  display: 'grid',
  padding: '1rem',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  columnGap: '1rem',
  rowGap: '1rem',
});

const ProjectsPage: React.FC = () => {
  const { isLoading, data: projects } = useGetProjects();
  console.log(projects);
  return (
    <Container>
      <h2 style={{ padding: '1rem 0 1rem 1rem' }}>Projects Page</h2>
      <GridContainer>
        {!isLoading &&
          projects?.map((project) => (
            <Card key={project.project_id}>
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
              <div>{`Number of todos: ${project._count.todo}`}</div>
              <Link
                style={{ color: 'white' }}
                to={`/projects/${project.project_id}`}
              >
                See more
              </Link>
            </Card>
          ))}
      </GridContainer>
    </Container>
  );
};

export default ProjectsPage;
