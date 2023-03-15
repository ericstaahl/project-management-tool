import React from 'react';
import styled from '@emotion/styled';
import { useDroppable } from '@dnd-kit/core';

const StyledDroppable = styled.div((props: { isOver: boolean }) => ({
    color: props.isOver ? 'green' : '',
    backgroundColor: 'red',
    width: '200px',
    height: '200px',
}));

const Droppable = (props: {
    id: string;
    children?: React.ReactNode;
}): JSX.Element => {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });
    return (
        <StyledDroppable isOver={isOver} ref={setNodeRef}>
            {props.children}
        </StyledDroppable>
    );
};

export default Droppable;
