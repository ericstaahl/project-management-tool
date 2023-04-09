import React from 'react';
import styled from '@emotion/styled';
import { Todos } from '../../types/TodoTypes';
import Card from '../styled/Card';
import EditLink from '../styled/EditLink';
import H3 from '../styled/H3';
import TextLineClamp from '../styled/TextLineClamp';
import EditIcon from '@mui/icons-material/Edit';
import { colors } from '../../lib/colors';
import IconButton from '@mui/material/IconButton';

const BoldSpan = styled.span({
    fontWeight: 'bold',
});
const TitleWrapper = styled.div({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    wordBreak: 'normal',
    margin: 'auto 0',
});

const TitleEditWrapper = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    height: 'auto',
});
const statuses = {
    NOT_STARTED: 'Not started',
    IN_PROGRESS: 'In progress',
    DONE: 'Done',
};

const TodoCard = ({ todo }: { todo: Todos[0] }): JSX.Element => {
    return (
        <Card key={todo.todo_id}>
            <TitleEditWrapper>
                <TitleWrapper>
                    <H3>{`${todo.title}`}</H3>
                </TitleWrapper>
                <EditLink to={`${location.pathname}/todo/${todo.todo_id}/edit`}>
                    <IconButton style={{ color: colors.secondary }}>
                        <EditIcon fontSize={'small'} />
                    </IconButton>
                </EditLink>
            </TitleEditWrapper>
            <div>
                <BoldSpan>Estimation </BoldSpan>
                <TextLineClamp>{todo.estimate}</TextLineClamp>
            </div>
            <div>
                <BoldSpan>Status </BoldSpan>
                <TextLineClamp>{statuses[todo.status]}</TextLineClamp>
            </div>
            <div>
                <BoldSpan>Assignee </BoldSpan>
                <TextLineClamp>{todo.assignee ?? 'None'}</TextLineClamp>
            </div>
            <div>
                <BoldSpan>Description </BoldSpan>
                <TextLineClamp style={{ fontSize: '0.9rem' }}>
                    {todo.description}
                </TextLineClamp>
            </div>
        </Card>
    );
};

export default TodoCard;
