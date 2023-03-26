import React from 'react';
import styled from '@emotion/styled';
import { Todos } from '../../types/TodoTypes';
import EditLink from '../styled/EditLink';
import H3 from '../styled/H3';
import TextLineClamp from '../styled/TextLineClamp';

const TitleWrapper = styled.div({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    wordBreak: 'break-word',
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
    backgroundColor: '#363942',
    padding: '1rem',
    fontSize: '1.2rem',
    height: '40vh',
    width: '40vw',
});

const TodoCard = ({ todo }: { todo: Todos[0] }): JSX.Element => {
    return (
        <InfoContainer key={todo.todo_id}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <TitleWrapper>
                    <H3>{`${todo.title}`}</H3>
                </TitleWrapper>
                <EditLink to={`${location.pathname}/todo/${todo.todo_id}/edit`}>
                    ...
                </EditLink>
            </div>
            <div>
                <BoldSpan>Estimation: </BoldSpan>
                <TextLineClamp>{todo.estimate}</TextLineClamp>
            </div>
            <div>
                <BoldSpan>Status: </BoldSpan>
                <TextLineClamp>{statuses[todo.status]}</TextLineClamp>
            </div>
            <div>
                <BoldSpan>Assignee: </BoldSpan>
                <TextLineClamp>{todo.assignee ?? 'None'}</TextLineClamp>
            </div>
            <div>
                <BoldSpan>Description: </BoldSpan>
                <TextLineClamp style={{ fontSize: '1.1rem' }}>
                    {todo.description}
                </TextLineClamp>
            </div>
        </InfoContainer>
    );
};

export default TodoCard;
