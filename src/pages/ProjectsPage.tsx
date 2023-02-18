import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/styled/Card';
import Container from '../components/styled/Container';
import useGetProjects from '../hooks/project/useGetProjects';
import Select from 'react-select';

const GridContainer = styled.div({
    display: 'grid',
    padding: '1rem',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    columnGap: '1rem',
    rowGap: '1rem',
});

const sortOptions = [
    { value: 'due_date', label: 'Due date' },
    { value: 'title', label: 'Title' },
    { value: 'todo', label: "To-do's (number)" },
];

const ProjectsPage: React.FC = () => {
    const [sortBy, setSortBy] = useState({
        value: 'due_date',
        label: 'Due date',
    });
    const { isLoading, data: projects } = useGetProjects(sortBy.value);
    console.log(projects);
    return (
        <Container>
            <h2 style={{ padding: '1rem 0 1rem 1rem' }}>Projects Page</h2>
            <div
                style={{
                    margin: '1rem',
                    width: '40%',
                    display: 'flex',
                    alignContent: 'center',
                    columnGap: '1rem',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '1.2rem',
                    }}
                >
                    Sort by:
                </div>
                <Select
                    isDisabled={projects === undefined || projects?.length <= 0}
                    options={sortOptions}
                    defaultValue={{ value: 'due_date', label: 'Due date' }}
                    isSearchable={false}
                    isMulti={false}
                    styles={{
                        container: (baseStyles) => ({
                            ...baseStyles,
                            minWidth: '180px',
                        }),
                        option: (baseStyles) => ({
                            ...baseStyles,
                            color: '#111',
                        }),
                    }}
                    onChange={(selected) => {
                        if (selected !== null)
                            setSortBy({
                                label: selected.label,
                                value: selected.value,
                            });
                    }}
                />
            </div>
            <GridContainer>
                {!isLoading &&
                    projects !== undefined &&
                    (projects.length > 0 ? (
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
                                <div>{`Number of todos: ${project._count.todo}`}</div>
                                <Link
                                    style={{ color: 'white' }}
                                    to={`/projects/${project.project_id}`}
                                >
                                    See more
                                </Link>
                            </Card>
                        ))
                    ) : (
                        <div>No projects exists</div>
                    ))}
            </GridContainer>
        </Container>
    );
};

export default ProjectsPage;
