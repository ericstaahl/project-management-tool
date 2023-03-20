import styled from '@emotion/styled';
import React, { useMemo } from 'react';
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

    const expiredProjects = useMemo(() => {
        const expiredProjects: JSX.Element[] = [];
        projects?.forEach((project) => {
            const daysLeft = nowFromDate(project.due_date);
            if (daysLeft === 0) {
                expiredProjects.push(
                    <ProjectCard
                        key={project.project_id}
                        project={project}
                        daysLeft={daysLeft}
                    />
                );
            }
        });
        return expiredProjects;
    }, [projects]);

    const unfinishedProjects = useMemo(() => {
        const unfinishedProjects: JSX.Element[] = [];
        projects?.forEach((project) => {
            const daysLeft = nowFromDate(project.due_date);
            if (daysLeft > 0) {
                unfinishedProjects.push(
                    <ProjectCard
                        key={project.project_id}
                        project={project}
                        daysLeft={daysLeft}
                    />
                );
            }
        });
        return unfinishedProjects;
    }, [projects]);

    return (
        <Container>
            <H2>Dashboard</H2>
            {!isLoading && (
                <div>
                    {expiredProjects !== undefined &&
                        expiredProjects.length > 0 && (
                            <GridContainer>{expiredProjects}</GridContainer>
                        )}
                    {unfinishedProjects !== undefined &&
                        unfinishedProjects.length > 0 && (
                            <GridContainer>{unfinishedProjects}</GridContainer>
                        )}
                </div>
            )}
        </Container>
    );
};

export default HomePage;
