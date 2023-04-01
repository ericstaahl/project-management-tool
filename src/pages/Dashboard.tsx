import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import ProjectCard from '../components/DashBoard/ProjectCard';
import Container from '../components/styled/Container';
import H2 from '../components/styled/H2';
import H3 from '../components/styled/H3';
import { nowFromDate } from '../helpers/formatDate';
import useGetProjects from '../hooks/project/useGetProjects';
import useAuth from '../context/AuthContext';
import { Link } from 'react-router-dom';
import GridContainer from '../components/styled/GridContainer';

const TextWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '0.5rem',
    marginTop: '1rem',
});

const StyledLink = styled(Link)({
    color: '#f5f5f5 ',
    ':hover': {
        color: '#cfcfcf',
    },
});

const HomePage: React.FC = () => {
    const { isLoading, data: projects } = useGetProjects({
        sortBy: 'due_date',
    });

    const expiredProjects = useMemo(() => {
        const expiredProjects: JSX.Element[] = [];
        projects?.forEach((project) => {
            console.log(project);
            if (project.complete) return;
            const hoursLeft = nowFromDate(project.due_date, 'hours');
            // Checking against -24 to check if it is still on the due date or if it has passed
            if (hoursLeft < -24) {
                expiredProjects.push(
                    <ProjectCard
                        key={project.project_id}
                        project={project}
                        hoursLeft={hoursLeft}
                    />
                );
            }
        });
        return expiredProjects;
    }, [projects]);

    const unfinishedProjects = useMemo(() => {
        const unfinishedProjects: JSX.Element[] = [];
        projects?.forEach((project) => {
            if (project.complete) return;
            const hoursLeft = nowFromDate(project.due_date, 'hours');
            // Checking against -24 to check if it is still on the due date or if it has passed
            if (hoursLeft >= -24) {
                unfinishedProjects.push(
                    <ProjectCard
                        key={project.project_id}
                        project={project}
                        hoursLeft={hoursLeft}
                    />
                );
            }
        });
        return unfinishedProjects;
    }, [projects]);

    const auth = useAuth();

    return (
        <Container>
            <H2>
                {auth?.username !== undefined
                    ? `Welcome back ${auth?.username}`
                    : `Welcome back`}
            </H2>
            {!isLoading && (
                <div>
                    {expiredProjects !== undefined &&
                        expiredProjects.length > 0 && (
                            <>
                                <H3 style={{ marginTop: '1.5rem' }}>
                                    Projects passed due date
                                </H3>
                                <GridContainer>{expiredProjects}</GridContainer>
                            </>
                        )}
                    {unfinishedProjects !== undefined &&
                        unfinishedProjects.length > 0 && (
                            <>
                                <H3 style={{ marginTop: '1.5rem' }}>
                                    Projects closest to due date
                                </H3>
                                <GridContainer>
                                    {unfinishedProjects}
                                </GridContainer>
                            </>
                        )}
                    {projects !== undefined &&
                        (projects.length === 0 ||
                            unfinishedProjects.length === 0 ||
                            expiredProjects.length === 0) && (
                            <>
                                <H3 style={{ marginTop: '0.5rem' }}>
                                    Nothing here?
                                </H3>
                                <TextWrapper>
                                    <p>
                                        Here you can find information about
                                        upcoming projects and due dates!
                                    </p>
                                    <p>
                                        Get started by adding a project{' '}
                                        <span>
                                            {
                                                <StyledLink
                                                    to={'/projects/new'}
                                                >
                                                    here
                                                </StyledLink>
                                            }
                                        </span>
                                        !
                                    </p>
                                </TextWrapper>
                            </>
                        )}
                </div>
            )}
        </Container>
    );
};

export default HomePage;
