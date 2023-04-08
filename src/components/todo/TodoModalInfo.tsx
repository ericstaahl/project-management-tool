import React from 'react';
import styled from '@emotion/styled';
import EditLink from '../styled/EditLink';
import H3 from '../styled/H3';
import TextLineClamp from '../styled/TextLineClamp';
import { colors } from '../../lib/colors';
import IconButton from '@mui/material/IconButton';
import MoreHorizontal from '@mui/icons-material/MoreHoriz';
import useGetTodo from '../../hooks/todo/useGetTodo';
import CommentSection, { Params } from '../CommentSection';
import { MutateOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import useAddTodoComment from '../../hooks/todo/useAddTodoComment';

const TitleWrapper = styled.div({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    wordBreak: 'break-word',
    margin: 'auto 0',
});

const BoldSpan = styled.span({
    fontWeight: 'bold',
});

const statuses = {
    NOT_STARTED: 'Not started',
    IN_PROGRESS: 'In progress',
    DONE: 'Done',
};

const InfoContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1rem',
    borderRadius: '5px',
    backgroundColor: colors.primary,
    padding: '1rem',
    fontSize: '1.2rem',
});

const OuterContainer = styled.div({
    display: 'flex',
    rowGap: '1rem',
    borderRadius: '5px',
    backgroundColor: colors.primary,
    padding: '1rem',
    fontSize: '1.2rem',
    minWidth: '80vh',
    minHeight: '40vh',
    justifyContent: 'space-between',
});

interface Props {
    todoId: string;
    projectId: string;
}

const TodoCard = ({ todoId, projectId }: Props): JSX.Element => {
    const { data: todo, isLoading, refetch } = useGetTodo(projectId, todoId);
    console.log(todo);

    const addComment = useAddTodoComment();
    const handleAddComment = (
        data: Params,
        options?:
            | MutateOptions<AxiosResponse<any, any>, unknown, Params, unknown>
            | undefined
    ): void => {
        addComment.mutate(data, options);
    };

    return (
        <>
            <OuterContainer>
                {todo !== undefined && !isLoading && (
                    <>
                        <InfoContainer>
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
                                    <IconButton
                                        style={{ color: colors.secondary }}
                                    >
                                        <MoreHorizontal fontSize={'large'} />
                                    </IconButton>
                                </EditLink>
                            </div>
                            <div>
                                <BoldSpan>Estimation: </BoldSpan>
                                <TextLineClamp>{todo.estimate}</TextLineClamp>
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
                                <TextLineClamp style={{ fontSize: '1.1rem' }}>
                                    {todo.description}
                                </TextLineClamp>
                            </div>
                        </InfoContainer>
                        <div style={{ padding: '1rem' }}>
                            <CommentSection
                                comments={todo.todo_comment}
                                handleAddComment={handleAddComment}
                                handleRefetch={async () => {
                                    await refetch();
                                }}
                                id={todoId}
                                commentRoute={'todos'}
                            />
                        </div>
                    </>
                )}
            </OuterContainer>
        </>
    );
};

export default TodoCard;
