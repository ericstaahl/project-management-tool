import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddUserToProject from '../../components/project/AddUserToProject';
import Modal from '../../components/Modal';
import SelectInput from '../../components/input/SelectInput';
import Button from '../../components/styled/Button';
import Container from '../../components/styled/Container';
import H2 from '../../components/styled/H2';
import useAuth from '../../context/AuthContext';
import useGetProject from '../../hooks/project/useGetProject';
import useGetTodos from '../../hooks/todo/useGetTodos';
import TodoBoard from '../../components/todo/TodoBoard';
import TodoCard from '../../components/todo/TodoCard';
import { nowFromDate } from '../../helpers/formatDate';
import SetNewDueDate from './SetNewDueDate';
import ProjectModalInfo from '../../components/project/ProjectModalInfo';
import GridContainer from '../../components/styled/GridContainer';
import ButtonContainer from '../../components/styled/ButtonContainer';
import CommentSection, { Params } from '../../components/CommentSection';
import useAddProjectComment from '../../hooks/project/useAddProjectComment';
import { MutateOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import RemoveUserFromProject from '../../components/project/RemoveUserFromProject.tsx';
import { toast } from 'react-toastify';
import useLeaveProject from '../../hooks/user/useLeaveProject';

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
    const { id: projectId } = useParams();
    const { data: project, refetch } = useGetProject(projectId);
    const [sortBy, setSortBy] = useState({ value: 'title', label: 'Title' });
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [statusFilter, setStatusFilter] = useState<{
        value: 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE';
        label: string;
    } | null>(null);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const {
        data,
        isLoading,
        refetch: refetchTodos,
    } = useGetTodos(
        Number(projectId),
        sortBy.value,
        statusFilter?.value ?? null,
        sortOrder
    );
    const navigate = useNavigate();
    const [showAddUser, setShowAddUser] = useState(false);
    const [showRemoveUser, setShowRemoveUser] = useState(false);

    const [showNewDateInput, setShowNewDateInput] = useState(false);
    const auth = useAuth();
    const [toggleDescription, setToggleDescription] = useState(false);
    const handleSetSortOrder = (order: SortOrder): void => {
        setSortOrder(order);
    };
    const [toggleBoardView, setToggleBoardView] = useState(true);

    useEffect(() => {
        if (project === undefined || project.complete || !isInitialRender)
            return;
        const daysLeft = nowFromDate(project.due_date, 'days');
        if (daysLeft < 0) {
            setShowNewDateInput(true);
        }
        setIsInitialRender(false);
    }, [project]);

    const addComment = useAddProjectComment();
    const handleAddComment = (
        data: Params,
        options?:
            | MutateOptions<AxiosResponse<any, any>, unknown, Params, unknown>
            | undefined
    ): void => {
        addComment.mutate(data, options);
    };

    const leaveProject = useLeaveProject();

    const handleLeaveProject = (): void => {
        if (project === undefined || auth === undefined || auth === null)
            return;
        leaveProject.mutate(
            {
                projectId: String(project.project_id),
            },
            {
                onSuccess: () => {
                    navigate('/projects');
                },
                onError: () => {
                    toast.error(
                        'An error occured when trying to leave project.'
                    );
                },
            }
        );
    };

    return (
        <>
            {showAddUser && project !== undefined && (
                <Modal
                    handleSetShowModal={() => {
                        setShowAddUser(false);
                    }}
                >
                    <AddUserToProject
                        project={project}
                        handleRefetchProjects={async () => {
                            await refetch();
                        }}
                    />
                </Modal>
            )}
            {showRemoveUser && project !== undefined && (
                <Modal
                    handleSetShowModal={() => {
                        setShowRemoveUser(false);
                    }}
                >
                    <RemoveUserFromProject
                        handleRefetchs={async () => {
                            await refetch();
                            await refetchTodos();
                        }}
                        project={project}
                    />
                </Modal>
            )}
            {showNewDateInput && project !== undefined && (
                <Modal
                    handleSetShowModal={() => {
                        setShowNewDateInput(false);
                    }}
                >
                    <SetNewDueDate
                        project={project}
                        handleRefetch={async () => {
                            await refetch();
                        }}
                        handleSetShowModal={() => {
                            setShowNewDateInput(false);
                        }}
                    />
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
                                marginTop: '1rem',
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
                            <Modal
                                handleSetShowModal={() => {
                                    setToggleDescription(!toggleDescription);
                                }}
                            >
                                <ProjectModalInfo
                                    project={project}
                                    auth={auth}
                                    detail={true}
                                />
                            </Modal>
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
                <div style={{ display: toggleBoardView ? 'initial' : 'none' }}>
                    {data !== undefined && <TodoBoard data={data} />}
                </div>

                <GridContainer
                    style={{ display: toggleBoardView ? 'none' : 'grid' }}
                >
                    {!isLoading &&
                        data !== undefined &&
                        (data.length > 0 ? (
                            data?.map((todo) => (
                                <TodoCard key={todo.todo_id} todo={todo} />
                            ))
                        ) : (
                            <div style={{ fontStyle: 'italic' }}>
                                No to-dos found
                            </div>
                        ))}
                </GridContainer>

                <ButtonContainer>
                    <Button
                        onClick={() => {
                            navigate('new-todo');
                        }}
                    >
                        Add to-do
                    </Button>
                    {auth?.user_id === project?.user_id && (
                        <>
                            <Button
                                onClick={() => {
                                    setShowAddUser(true);
                                }}
                            >
                                Add users
                            </Button>
                            <Button
                                onClick={() => {
                                    setShowRemoveUser(true);
                                }}
                            >
                                Remove users
                            </Button>
                            <Button
                                onClick={() => {
                                    navigate('edit');
                                }}
                            >
                                Edit project
                            </Button>
                        </>
                    )}
                    {auth?.user_id !== project?.user_id && (
                        <Button onClick={handleLeaveProject}>
                            Leave project
                        </Button>
                    )}
                </ButtonContainer>

                {project?.project_comment !== undefined && (
                    <CommentSection
                        comments={project.project_comment}
                        id={String(project.project_id)}
                        handleRefetch={async () => {
                            await refetch();
                        }}
                        handleAddComment={handleAddComment}
                        commentRoute={'projects'}
                    />
                )}
            </Container>
        </>
    );
};

export default ProjectPage;
