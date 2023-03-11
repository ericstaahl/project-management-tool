import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import AddUserToProject from '../components/AddUserToProject';
import Modal from '../components/Modal';
import ProjectDescription from '../components/ProjectDescription';
import SelectInput from '../components/SelectInput';
import Button from '../components/styled/Button';
import Card from '../components/styled/Card';
import Container from '../components/styled/Container';
import H2 from '../components/styled/H2';
import useAuth from '../context/AuthContext';
import useGetProject from '../hooks/project/useGetProject';
import useGetTodos from '../hooks/todo/useGetTodos';

const GridContainer = styled.div({
    display: 'grid',
    margin: '1rem 0',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    columnGap: '1rem',
    rowGap: '1rem',
});

const TextContainer = styled.div({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
});

const EditTodoLink = styled(Link)({
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: '1.5rem',
    textAlign: 'center',
});

const TitleWrapper = styled.div({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    wordBreak: 'break-all',
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

const statusOptions: StatusOptions[] = [
    { value: 'NOT_STARTED', label: 'Not started' },
    { value: 'IN_PROGRESS', label: 'In progress' },
    { value: 'DONE', label: 'Done' },
];

const BoldSpan = styled.span({
    fontWeight: 'bold',
});

interface StatusOptions {
    value: 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE';
    label: string;
}

type SortOrder = 'asc' | 'desc';

const ProjectPage: React.FC = () => {
    const location = useLocation();
    console.log(location);
    const { id: projectId } = useParams();
    const { data: project } = useGetProject(projectId);
    console.log(project);
    const [sortBy, setSortBy] = useState({ value: 'title', label: 'Title' });
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [statusFilter, setStatusFilter] = useState<{
        value: 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE';
        label: string;
    } | null>(null);
    const { data, isLoading } = useGetTodos(
        Number(projectId),
        sortBy.value,
        statusFilter?.value ?? null,
        sortOrder
    );
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const auth = useAuth();
    const [toggleDescription, setToggleDescription] = useState(false);
    const handleSetSortOrder = (order: SortOrder): void => {
        setSortOrder(order);
    };

    return (
        <>
            {showModal && (
                <Modal
                    handleSetShowModal={() => {
                        setShowModal(false);
                    }}
                >
                    <AddUserToProject projectId={projectId} />
                </Modal>
            )}
            <Container>
                {!isLoading && project !== undefined && (
                    <>
                        <H2>{project?.title ?? 'Project'}</H2>
                        <Button
                            onClick={() => {
                                setToggleDescription(!toggleDescription);
                            }}
                        >
                            Show info
                        </Button>
                        {toggleDescription && (
                            <div>
                                <ProjectDescription
                                    project={project}
                                    auth={auth}
                                    detail={true}
                                />
                            </div>
                        )}
                    </>
                )}
                <div style={{ display: 'flex' }}>
                    <SelectInput<typeof sortOptions[0]>
                        label={'Sort by'}
                        sortOrder={sortOrder}
                        handleSetSortOrder={handleSetSortOrder}
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
                </div>
                <div style={{ display: 'flex' }}>
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
                </div>
                <GridContainer>
                    {!isLoading &&
                        data !== undefined &&
                        (data.length > 0 ? (
                            data?.map((todo) => (
                                <Card
                                    style={{ width: '250px' }}
                                    key={todo.todo_id}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <TitleWrapper>
                                            <h3>{`${todo.title}`}</h3>
                                        </TitleWrapper>
                                        <EditTodoLink
                                            to={`${location.pathname}/todo/${todo.todo_id}/edit`}
                                        >
                                            ...
                                        </EditTodoLink>
                                    </div>
                                    <div>
                                        <BoldSpan>Estimation: </BoldSpan>
                                        <TextContainer>
                                            {todo.estimate}
                                        </TextContainer>
                                    </div>
                                    <div>
                                        <BoldSpan>Status: </BoldSpan>
                                        <TextContainer>
                                            {statuses[todo.status]}
                                        </TextContainer>
                                    </div>
                                    <div>
                                        <BoldSpan>Assignee: </BoldSpan>
                                        <TextContainer>
                                            {todo.assignee ?? 'None'}
                                        </TextContainer>
                                    </div>
                                    <div>
                                        <BoldSpan>Description: </BoldSpan>
                                        <TextContainer
                                            style={{ fontSize: '0.9rem' }}
                                        >
                                            {todo.description}
                                        </TextContainer>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <div style={{ fontStyle: 'italic' }}>
                                No to-dos found
                            </div>
                        ))}
                </GridContainer>
                <div
                    style={{
                        display: 'flex',
                        columnGap: '1rem',
                        padding: '1rem 0',
                    }}
                >
                    <Button
                        onClick={() => {
                            navigate('new-todo');
                        }}
                    >
                        Add to-do
                    </Button>
                    <Button
                        onClick={() => {
                            setShowModal(true);
                        }}
                    >
                        Add users
                    </Button>
                    <Button
                        onClick={() => {
                            navigate('edit');
                        }}
                    >
                        Edit project
                    </Button>
                </div>
            </Container>
        </>
    );
};

export default ProjectPage;
