import styled from '@emotion/styled';
import React from 'react';
import ProjectCard from '../components/DashBoard/ProjectCard';
import Container from '../components/styled/Container';
import H2 from '../components/styled/H2';
import { nowFromDate } from '../helpers/formatDate';
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
            {!isLoading && (
                <div>
                    <GridContainer>
                        {projects?.map((project) => {
                            const daysLeft = nowFromDate(project.due_date);
                            return daysLeft === 0 && !project.finished ? (
                                <ProjectCard
                                    key={project.project_id}
                                    project={project}
                                    daysLeft={daysLeft}
                                />
                            ) : null;
                        })}
                    </GridContainer>
                    <GridContainer>
                        {projects?.map((project) => {
                            const daysLeft = nowFromDate(project.due_date);
                            return daysLeft > 0 ? (
                                <ProjectCard
                                    key={project.project_id}
                                    project={project}
                                    daysLeft={daysLeft}
                                />
                            ) : null;
                        })}
                    </GridContainer>
                </div>
            )}
        </Container>
    );
};

export default HomePage;
