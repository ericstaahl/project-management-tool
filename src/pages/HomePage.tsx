import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/styled/Card';
import Container from '../components/styled/Container';
import H2 from '../components/styled/H2';
import H3 from '../components/styled/H3';
import { formatDate, nowFromDate } from '../helpers/formatDate';
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
                            <div>
                                <H3>{project.title}</H3>
                                <div style={{ marginTop: '0.8rem' }}>
                                    {`Start date: ${formatDate(
                                        project.start_date
                                    )}`}
                                </div>

                                <div style={{ marginTop: '0.8rem' }}>
                                    {`Due date: ${formatDate(
                                        project.due_date
                                    )}`}
                                </div>

                                <div style={{ marginTop: '0.8rem' }}>
                                    {nowFromDate(project.due_date) > 0
                                        ? `${nowFromDate(
                                              project.due_date
                                          )} days left`
                                        : 'Due date passed'}
                                </div>
                            </div>

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
