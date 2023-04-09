import React from 'react';
import styled from '@emotion/styled';
import EditLink from '../styled/EditLink';
import H3 from '../styled/H3';
import TextLineClamp from '../styled/TextLineClamp';
import { colors } from '../../lib/colors';
import IconButton from '@mui/material/IconButton';
import Edit from '@mui/icons-material/Edit';
import useGetTodo from '../../hooks/todo/useGetTodo';
import CommentSection, { Params } from '../CommentSection';
import { MutateOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import useAddTodoComment from '../../hooks/todo/useAddTodoComment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from '@mui/material';

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
    padding: '0.5rem',
    fontSize: '1.2rem',
    width: '50%',
});

const OuterContainer = styled.div({
    display: 'flex',
    rowGap: '1rem',
    borderRadius: '5px',
    backgroundColor: colors.primary,
    padding: '1rem',
    fontSize: '1.2rem',
    minWidth: '80vw',
    minHeight: '40vh',
    justifyContent: 'space-between',
});

const CategoryContainer = styled.div({
    padding: '0 0.5rem',
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
                                    padding: '0 0.5rem',
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
                                        <Edit fontSize={'medium'} />
                                    </IconButton>
                                </EditLink>
                            </div>
                            <CategoryContainer>
                                <BoldSpan>Estimation </BoldSpan>
                                <TextLineClamp style={{ marginTop: '0.3rem' }}>
                                    {todo.estimate}
                                </TextLineClamp>
                            </CategoryContainer>
                            <CategoryContainer>
                                <BoldSpan>Status </BoldSpan>
                                <TextLineClamp style={{ marginTop: '0.3rem' }}>
                                    {statuses[todo.status]}
                                </TextLineClamp>
                            </CategoryContainer>
                            <CategoryContainer>
                                <BoldSpan>Assignee </BoldSpan>
                                <TextLineClamp style={{ marginTop: '0.3rem' }}>
                                    {todo.assignee ?? 'None'}
                                </TextLineClamp>
                            </CategoryContainer>
                            <div>
                                <BoldSpan style={{ padding: '0 0.5rem' }}>
                                    Description{' '}
                                </BoldSpan>
                                <Accordion sx={{ marginTop: '0.3rem' }}>
                                    <AccordionSummary
                                        sx={{ paddingLeft: '0.5rem' }}
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Typography
                                            sx={{
                                                display: '-webkit-box',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 1,
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {todo.description}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {todo.description}
                                        </Typography>
                                    </AccordionDetails>
                                    <Typography></Typography>
                                </Accordion>
                            </div>
                        </InfoContainer>
                        <div
                            style={{
                                padding: '1rem',
                                flexGrow: 1,
                            }}
                        >
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
