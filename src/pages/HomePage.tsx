import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/styled/Card';
import Container from '../components/styled/Container';
import H2 from '../components/styled/H2';
import useGetProjects from '../hooks/project/useGetProjects';

const GridContainer = styled.div({
    display: 'grid',
    padding: '1rem 0',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    columnGap: '1rem',
    rowGap: '1rem',
});

const HomePage: React.FC = () => {
    const { isLoading, data: projects } = useGetProjects();
    return (
        <Container>
            <H2>Dashboard</H2>
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
                            <div>{`Due date: ${new Date(
                                project.due_date
                            ).toLocaleDateString('sv-SE')}`}</div>
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

export default HomePage;
