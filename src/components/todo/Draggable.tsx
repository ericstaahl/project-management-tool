import React from 'react';
import styled from '@emotion/styled';
import { useDraggable } from '@dnd-kit/core';
import { Transform } from '@dnd-kit/utilities/dist/css';

const StyledDraggable = styled.div(
    (props: { transform: Transform | null }) => ({
        transform:
            props.transform !== null
                ? `translate3d(${props.transform.x}px, ${props.transform.y}px, 0)`
                : undefined,
        backgroundColor: 'blue',
        width: '40px',
        cursor: 'pointer',
        margin: '0.5rem',
    })
);

const Draggable = (props: {
    id: string;
    children: React.ReactNode;
}): JSX.Element => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    });
    return (
        <StyledDraggable
            transform={transform}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
        >
            {props.children}
        </StyledDraggable>
    );
};

export default Draggable;
