import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/styled/Card';
import Container from '../components/styled/Container';
import useGetProjects from '../hooks/project/useGetProjects';
import H2 from '../components/styled/H2';
import SelectInput from '../components/SelectInput';
import SortOrderArrow from '../components/SortOrderArrow';

const GridContainer = styled.div({
    display: 'grid',
    margin: '1rem 0',
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
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const { isLoading, data: projects } = useGetProjects(
        sortBy.value,
        sortOrder
    );
    console.log(projects);
    return (
        <Container>
            <H2>Projects</H2>
            <SelectInput<typeof sortOptions[0]>
                label={'Sort by'}
                selectProps={{
                    options: sortOptions,
                    defaultValue: { value: 'due_date', label: 'Due date' },
                    onChange: (selected) => {
                        if (selected !== null)
                            setSortBy({
                                label: selected.label,
                                value: selected.value,
                            });
                    },
                }}
            />
            <SortOrderArrow
                handleSetSortOrder={(order) => {
                    setSortOrder(order);
                }}
                sortOrder={sortOrder}
            />
            <GridContainer>
                {!isLoading &&
                    projects !== undefined &&
                    (projects.length > 0 ? (
                        projects?.map((project) => (
                            <Card key={project.project_id}>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignContent: 'center',
                                        height: 'auto',
                                    }}
                                >
                                    <h3>{project.title}</h3>
                                    <Link
                                        style={{
                                            color: 'white',
                                            textDecoration: 'none',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                            fontSize: '1.5rem',
                                            textAlign: 'center',
                                        }}
                                        to={`/projects/${project.project_id}/edit`}
                                    >
                                        ...
                                    </Link>
                                </div>
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
                        <div style={{ fontStyle: 'italic' }}>
                            No projects found
                        </div>
                    ))}
            </GridContainer>
        </Container>
    );
};

export default ProjectsPage;
