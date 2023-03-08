import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/styled/Card';
import Container from '../components/styled/Container';
import useGetProjects from '../hooks/project/useGetProjects';
import H2 from '../components/styled/H2';
import SelectInput from '../components/SelectInput';
import SortOrderArrow from '../components/SortOrderArrow';
import useAuth from '../context/AuthContext';

const GridContainer = styled.div({
    display: 'grid',
    margin: '1rem 0',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    columnGap: '1rem',
    rowGap: '1rem',
});

const TextContainer = styled.div({
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    width: '250px',
    overflow: 'hidden',
});

const BoldSpan = styled.span({
    fontWeight: 'bold',
});

const sortOptions = [
    { value: 'due_date', label: 'Due date' },
    { value: 'title', label: 'Title' },
    { value: 'todo', label: "To-do's (number)" },
];

const ProjectsPage: React.FC = () => {
    const auth = useAuth();

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
                                    <div>
                                        <BoldSpan>Number of members: </BoldSpan>
                                        <TextContainer>
                                            {`${project.number_of_members}`}
                                        </TextContainer>
                                    </div>
                                ) : (
                                    <></>
                                )}
                                <div>
                                    <BoldSpan>Start date: </BoldSpan>
                                    <TextContainer>
                                        {`${new Date(
                                            project.start_date
                                        ).toLocaleDateString('sv-SE')}`}
                                    </TextContainer>
                                </div>
                                <div>
                                    <BoldSpan>Due date: </BoldSpan>
                                    <TextContainer>
                                        {`${new Date(
                                            project.due_date
                                        ).toLocaleDateString('sv-SE')}`}
                                    </TextContainer>
                                </div>
                                <div>
                                    <BoldSpan>Number of todos: </BoldSpan>
                                    <TextContainer>
                                        {`${project._count.todo}`}
                                    </TextContainer>
                                </div>
                                <div>
                                    <BoldSpan>Role: </BoldSpan>
                                    <TextContainer>
                                        {project.user_id === auth?.user_id
                                            ? 'Owner'
                                            : 'Member'}
                                    </TextContainer>
                                </div>
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
