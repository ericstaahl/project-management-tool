import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SelectInput from '../components/SelectInput';
import Button from '../components/styled/Button';
import Card from '../components/styled/Card';
import Container from '../components/styled/Container';
import H2 from '../components/styled/H2';
import useGetTodos from '../hooks/todo/useGetTodos';

const GridContainer = styled.div({
    display: 'grid',
    margin: '1rem 0',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    columnGap: '1rem',
    rowGap: '1rem',
});

const statuses = {
    NOT_STARTED: 'Not started',
    IN_PROGRESS: 'In progress',
    DONE: 'Done',
};

const sortOptions = [
    { value: 'estimate', label: 'Estimate' },
    { value: 'title', label: 'Title' },
];

interface StatusOptions {
    value: 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE';
    label: string;
}

const statusOptions: StatusOptions[] = [
    { value: 'NOT_STARTED', label: 'Not started' },
    { value: 'IN_PROGRESS', label: 'In progress' },
    { value: 'DONE', label: 'Done' },
];

const ProjectPage: React.FC = () => {
    const { id: projectId } = useParams();
    const [sortBy, setSortBy] = useState({ value: 'title', label: 'Title' });
    const [statusFilter, setStatusFilter] = useState<{
        value: 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE';
        label: string;
    } | null>(null);
    const { data, isLoading } = useGetTodos(
        Number(projectId),
        sortBy.value,
        statusFilter?.value ?? null
    );
    const navigate = useNavigate();

    return (
        <Container>
            <H2>Project</H2>
            <SelectInput<typeof sortOptions[0]>
                label={'Sort by'}
                selectProps={{
                    options: sortOptions,
                    defaultValue: { value: 'title', label: 'Title' },
                    onChange: (selected) => {
                        if (selected !== null)
                            setSortBy({
                                label: selected.label,
                                value: selected.value,
                            });
                    },
                }}
            />
            <SelectInput<typeof statusOptions[0]>
                label={'Filter'}
                selectProps={{
                    options: statusOptions,
                    onChange: (selected) => {
                        if (selected !== null)
                            setStatusFilter({
                                label: selected.label,
                                value: selected.value,
                            });
                        else {
                            setStatusFilter(null);
                        }
                    },
                    isClearable: true,
                }}
            />
            <GridContainer>
                {!isLoading &&
                    data !== undefined &&
                    (data.length > 0 ? (
                        data?.map((todo) => (
                            <Card key={todo.todo_id}>
                                <h3>{`${todo.title}`}</h3>
                                <div>{`Estimation: ${todo.estimate}`}</div>
                                <div>{`Description: ${todo.description}`}</div>
                                <div>{`Status: ${statuses[todo.status]}`}</div>
                            </Card>
                        ))
                    ) : (
                        <div style={{ fontStyle: 'italic' }}>
                            No to-dos found
                        </div>
                    ))}
            </GridContainer>
            <Button
                onClick={() => {
                    navigate('new-todo');
                }}
            >
                Add to-do
            </Button>
        </Container>
    );
};

export default ProjectPage;
