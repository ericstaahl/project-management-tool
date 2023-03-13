import React, { useState } from 'react';
import {
    useDraggable,
    useDroppable,
    DndContext,
    DragEndEvent,
} from '@dnd-kit/core';
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
        cursor: 'pointer',
        margin: '0.5rem',
    })
);

const DragAndDropPage = (): JSX.Element => {
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

    const containers = ['A', 'B', 'C'];

    const [parent, setParent] = useState<string | number | null>(null);

    const draggableMarkup = <Draggable id={'draggable'}>Hi</Draggable>;

    const handleDragEvent = (event: DragEndEvent): void => {
        const { over } = event;
        setParent(over !== null ? over.id : null);
    };

    return (
        <Container>
            <DndContext onDragEnd={handleDragEvent}>
                {parent === null ? draggableMarkup : null}
                <div style={{ display: 'flex', columnGap: '1rem' }}>
                    {containers.map((id) => (
                        <Droppable key={id} id={id}>
                            {parent === id ? draggableMarkup : 'Drop here'}
                        </Droppable>
                    ))}
                </div>
            </DndContext>
        </Container>
    );
};

export default DragAndDropPage;
