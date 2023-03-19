import React from 'react';
import styled from '@emotion/styled';
import { useDroppable } from '@dnd-kit/core';

const StyledDroppable = styled.div((props: { isOver: boolean }) => ({
    color: props.isOver ? 'green' : '',
    minHeight: '300px',
    width: '100%',
    display: 'flex',
    rowGap: '0.5rem',
    flexDirection: 'column',
}));

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
    id: string;
    children?: React.ReactNode;
}

const Droppable = (props: Props): JSX.Element => {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });
    return (
        <StyledDroppable style={props.style} isOver={isOver} ref={setNodeRef}>
            {props.children}
        </StyledDroppable>
    );
};

export default Droppable;
