import React, { useCallback, useState } from 'react';
import {
    DndContext,
    DragEndEvent,
    UniqueIdentifier,
    Over,
    useSensors,
    useSensor,
    PointerSensor,
} from '@dnd-kit/core';
import Droppable from './Droppable';
import Draggable from './Draggable';
import { Todos } from '../../types/TodoTypes';
import useUpdadeTodo from '../../hooks/todo/useUpdateTodo';
import styled from '@emotion/styled';
import H3 from '../styled/H3';
import Modal from '../Modal';
import TodoModalInfo from './TodoModalInfo';
import { colors } from '../../lib/colors';

interface Props {
    data: Todos;
}

type CustomUniqueIdentifier =
    | (UniqueIdentifier & 'NOT_STARTED')
    | 'IN_PROGRESS'
    | 'DONE';

interface CustomOver extends Over {
    id: CustomUniqueIdentifier;
}

interface CustomDragEndEvent extends DragEndEvent {
    over: CustomOver;
}

const containers = [
    'NOT_STARTED' as const,
    'IN_PROGRESS' as const,
    'DONE' as const,
];

const GridContainer = styled.div({
    display: 'grid',
    padding: '1rem 0',
    gridTemplateColumns: '1fr 1fr 1fr',
    columnGap: '1rem',
    rowGap: '1rem',
    width: '100%',
    overflow: 'scroll',
});

const DroppableContainer = styled.div({
    backgroundColor: colors.primaryLighter,
    border: `2px solid ${colors.borderPrimary}`,
    borderRadius: '5px',
    padding: '1rem',
});

const TodoContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
});

const TodoBoard = ({ data: todos }: Props): JSX.Element => {
    const [showModal, setShowModal] = useState(false);
    const [todoToShow, setTodoToShow] = useState<Todos[0] | null>(null);
    console.log(todos);
    const updateTodo = useUpdadeTodo();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragEvent = useCallback((event: CustomDragEndEvent): void => {
        const { active, over } = event;
        if (todos === undefined || over === null) return;
        const todoToUpdate = todos.find(
            (todo) => todo.todo_id === Number(active.id)
        );
        if (todoToUpdate === undefined) return;
        if (todoToUpdate.status === over.id) return;
        todoToUpdate.status = over.id;
        updateTodo.mutate(
            {
                updatedTodo: todoToUpdate,
                projectId: String(todoToUpdate.project_id),
                todoId: String(todoToUpdate.todo_id),
            },
            {
                onSuccess: () => {
                    console.log('Successfully updated to-do.');
                },
            }
        );
    }, []);

    return (
        <>
            {showModal && (
                <Modal
                    handleSetShowModal={() => {
                        setShowModal(false);
                        setTodoToShow(null);
                    }}
                >
                    {todoToShow !== null && (
                        <TodoModalInfo todo={todoToShow}></TodoModalInfo>
                    )}
                </Modal>
            )}
            <DndContext onDragEnd={handleDragEvent} sensors={sensors}>
                <div style={{ display: 'flex', columnGap: '1rem' }}>
                    <GridContainer>
                        {containers.map((id) => {
                            return (
                                <DroppableContainer key={id}>
                                    <H3 style={{ margin: '0 0.4rem' }}>
                                        {id === 'NOT_STARTED'
                                            ? 'Not started'
                                            : id === 'IN_PROGRESS'
                                            ? 'In progress'
                                            : 'Done'}
                                    </H3>
                                    <div
                                        style={{
                                            display: 'flex',
                                            marginTop: '1rem',
                                        }}
                                    >
                                        <Droppable id={id}>
                                            {todos.map((todo) => {
                                                return (
                                                    <React.Fragment
                                                        key={todo.todo_id}
                                                    >
                                                        {todo.status === id && (
                                                            <Draggable
                                                                key={
                                                                    todo.todo_id
                                                                }
                                                                id={String(
                                                                    todo.todo_id
                                                                )}
                                                                onClick={() => {
                                                                    setTodoToShow(
                                                                        todo
                                                                    );
                                                                    setShowModal(
                                                                        true
                                                                    );
                                                                }}
                                                            >
                                                                <TodoContainer>
                                                                    <h4>
                                                                        {
                                                                            todo.title
                                                                        }
                                                                    </h4>
                                                                    <div>
                                                                        {`Assignee: ${
                                                                            todo.assignee ??
                                                                            'none'
                                                                        }`}
                                                                    </div>
                                                                </TodoContainer>
                                                            </Draggable>
                                                        )}
                                                    </React.Fragment>
                                                );
                                            })}
                                        </Droppable>
                                    </div>
                                </DroppableContainer>
                            );
                        })}
                    </GridContainer>
                </div>
            </DndContext>
        </>
    );
};

export default TodoBoard;
