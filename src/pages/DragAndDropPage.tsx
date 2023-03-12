import React, { useState } from 'react';
import { useDraggable, useDroppable, DndContext } from '@dnd-kit/core';
import { Transform } from '@dnd-kit/utilities/dist/css';
import Container from '../components/styled/Container';
import styled from '@emotion/styled';

const StyledDroppable = styled.div((props: { isOver: boolean }) => ({
    color: props.isOver ? 'green' : '',
    backgroundColor: 'red',
    width: '200px',
    height: '200px',
}));

const StyledDraggable = styled.div(
    (props: { transform: Transform | null }) => ({
        transform:
            props.transform !== null
                ? `translate3d(${props.transform.x}px, ${props.transform.y}px, 0)`
                : undefined,
        backgroundColor: 'blue',
        width: '40px',
    })
);

const DragAndDropPage = (): JSX.Element => {
    const Droppable = (props: { children?: React.ReactNode }): JSX.Element => {
        const { isOver, setNodeRef } = useDroppable({
            id: 'droppable',
        });
        return (
            <StyledDroppable isOver={isOver} ref={setNodeRef}>
                {props.children}
            </StyledDroppable>
        );
    };

    const Draggable = (props: { children?: React.ReactNode }): JSX.Element => {
        const { attributes, listeners, setNodeRef, transform } = useDraggable({
            id: 'draggable',
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

    const [isDropped, setIsDropped] = useState(false);
    const draggableMarkup = (
        <Draggable>
            <div>Hi</div>
        </Draggable>
    );

    const handleDragEvent = (event): void => {
        if (event.over && event.over.id === 'droppable') {
            setIsDropped(true);
        }
    };

    return (
        <Container>
            <DndContext onDragEnd={handleDragEvent}>
                {!isDropped ? draggableMarkup : null}
                <Droppable>
                    {isDropped ? draggableMarkup : 'Drop here'}
                </Droppable>
            </DndContext>
        </Container>
    );
};

export default DragAndDropPage;
