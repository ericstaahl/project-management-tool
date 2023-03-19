import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/styled/Card';
import Container from '../components/styled/Container';
import H2 from '../components/styled/H2';
import H3 from '../components/styled/H3';
import formatDate from '../helpers/formatDate';
import useGetProjects from '../hooks/project/useGetProjects';

const GridContainer = styled.div({
    display: 'grid',
    padding: '1rem 0',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    columnGap: '1rem',
    rowGap: '1rem',
});

const HomePage: React.FC = () => {
    const { isLoading, data: projects } = useGetProjects({
        sortBy: 'due_date',
    });
    return (
        <Container>
            <H2>Dashboard</H2>
            <GridContainer>
                {!isLoading &&
                    projects?.map((project) => (
                        <Card key={project.project_id}>
                            <H3>{project.title}</H3>
                            {project.number_of_members > 0 ? (
                                <div>{`Number of members: ${project.number_of_members}`}</div>
                            ) : (
                                <></>
                            )}
                            <div>{`Start date: ${formatDate(
                                project.start_date
                            )}`}</div>

                            <div>{`Due date: ${formatDate(
                                project.due_date
                            )}`}</div>

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
