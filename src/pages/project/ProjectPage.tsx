import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AddUserToProject from '../../components/project/AddUserToProject';
import Modal from '../../components/Modal';
import ProjectDescription from '../../components/project/ProjectDescription';
import SelectInput from '../../components/input/SelectInput';
import Button from '../../components/styled/Button';
import Card from '../../components/styled/Card';
import Container from '../../components/styled/Container';
import H2 from '../../components/styled/H2';
import useAuth from '../../context/AuthContext';
import useGetProject from '../../hooks/project/useGetProject';
import useGetTodos from '../../hooks/todo/useGetTodos';
import TextLineClamp from '../../components/styled/TextLineClamp';
import EditLink from '../../components/styled/EditLink';
import TodoBoard from '../../components/todo/TodoBoard';
import H3 from '../../components/styled/H3';

const GridContainer = styled.div({
    display: 'grid',
    margin: '1rem 0',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    columnGap: '1rem',
    rowGap: '1rem',
});

const TitleWrapper = styled.div({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    wordBreak: 'break-word',
});

const ButtonContainer = styled.div({
    display: 'flex',
    columnGap: '1rem',
    padding: '1rem 0',
});

const BoldSpan = styled.span({
    fontWeight: 'bold',
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

interface StatusOptions {
    value: 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE';
    label: string;
}

type SortOrder = 'asc' | 'desc';

const ProjectPage: React.FC = () => {
    const location = useLocation();
    const { id: projectId } = useParams();
    const { data: project } = useGetProject(projectId);
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
    const [toggleBoardView, setToggleBoardView] = useState(false);

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
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                rowGap: '1rem',
                            }}
                        >
                            <Button
                                onClick={() => {
                                    setToggleDescription(!toggleDescription);
                                }}
                            >
                                Show info
                            </Button>
                            <Button
                                onClick={() => {
                                    setToggleBoardView(!toggleBoardView);
                                }}
                            >
                                {toggleBoardView ? 'Table' : 'Board'}
                            </Button>
                        </div>
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
                            defaultValue: {
                                value: 'title',
                                label: 'Title',
                            },
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

                {toggleBoardView ? (
                    data !== undefined && <TodoBoard data={data} />
                ) : (
                    <GridContainer>
                        {!isLoading &&
                            data !== undefined &&
                            (data.length > 0 ? (
                                data?.map((todo) => (
                                    <Card key={todo.todo_id}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <TitleWrapper>
                                                <H3>{`${todo.title}`}</H3>
                                            </TitleWrapper>
                                            <EditLink
                                                to={`${location.pathname}/todo/${todo.todo_id}/edit`}
                                            >
                                                ...
                                            </EditLink>
                                        </div>
                                        <div>
                                            <BoldSpan>Estimation: </BoldSpan>
                                            <TextLineClamp>
                                                {todo.estimate}
                                            </TextLineClamp>
                                        </div>
                                        <div>
                                            <BoldSpan>Status: </BoldSpan>
                                            <TextLineClamp>
                                                {statuses[todo.status]}
                                            </TextLineClamp>
                                        </div>
                                        <div>
                                            <BoldSpan>Assignee: </BoldSpan>
                                            <TextLineClamp>
                                                {todo.assignee ?? 'None'}
                                            </TextLineClamp>
                                        </div>
                                        <div>
                                            <BoldSpan>Description: </BoldSpan>
                                            <TextLineClamp
                                                style={{ fontSize: '0.9rem' }}
                                            >
                                                {todo.description}
                                            </TextLineClamp>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <div style={{ fontStyle: 'italic' }}>
                                    No to-dos found
                                </div>
                            ))}
                    </GridContainer>
                )}

                <ButtonContainer>
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
                </ButtonContainer>
            </Container>
        </>
    );
};

export default ProjectPage;
