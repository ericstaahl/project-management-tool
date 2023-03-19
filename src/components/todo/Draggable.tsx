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
        backgroundColor: '#ededed',
        cursor: 'pointer',
        padding: '0.4rem 0.4rem',
        minHeight: '70px',
        borderRadius: '2px',
        color: '#111',
    })
);

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
    id: string;
    children: React.ReactNode;
}

const Draggable = (props: Props): JSX.Element => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    });
    return (
        <StyledDraggable
            transform={transform}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            onClick={props.onClick}
        >
            {props.children}
        </StyledDraggable>
    );
};

export default Draggable;
