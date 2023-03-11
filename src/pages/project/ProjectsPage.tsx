import styled from '@emotion/styled';
import React, { useState } from 'react';
import Card from '../../components/styled/Card';
import Container from '../../components/styled/Container';
import useGetProjects from '../../hooks/project/useGetProjects';
import H2 from '../../components/styled/H2';
import SelectInput from '../../components/input/SelectInput';
import useAuth from '../../context/AuthContext';
import ProjectDescription from '../../components/project/ProjectDescription';

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

type SortOrder = 'asc' | 'desc';

const ProjectsPage: React.FC = () => {
    const auth = useAuth();

    const [sortBy, setSortBy] = useState({
        value: 'due_date',
        label: 'Due date',
    });
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const { isLoading, data: projects } = useGetProjects(
        sortBy.value,
        sortOrder
    );

    const handleSetSortOrder = (order: SortOrder): void => {
        setSortOrder(order);
    };

    console.log(projects);

    return (
        <Container>
            <H2>Projects</H2>
            <SelectInput<typeof sortOptions[0]>
                label={'Sort by'}
                sortOrder={sortOrder}
                handleSetSortOrder={handleSetSortOrder}
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
            <GridContainer>
                {!isLoading &&
                    projects !== undefined &&
                    (projects.length > 0 ? (
                        projects?.map((project) => (
                            <Card key={project.project_id}>
                                <ProjectDescription
                                    project={project}
                                    auth={auth}
                                />
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
