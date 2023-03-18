import React, { useCallback } from 'react';
import {
    DndContext,
    DragEndEvent,
    UniqueIdentifier,
    Over,
} from '@dnd-kit/core';
import Droppable from './Droppable';
import Draggable from './Draggable';
import { Todos } from '../../types/TodoTypes';
import useUpdadeTodo from '../../hooks/todo/useUpdateTodo';
import styled from '@emotion/styled';
import H2 from '../styled/H2';

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
});

const TodoBoard = ({ data: todos }: Props): JSX.Element => {
    console.log(todos);
    const updateTodo = useUpdadeTodo();

    const handleDragEvent = useCallback((event: CustomDragEndEvent): void => {
        const { active, over } = event;
        if (todos === undefined || over === null) return;
        const todoToUpdate = todos.find(
            (todo) => todo.todo_id === Number(active.id)
        );
        if (todoToUpdate === undefined) return;
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
        <DndContext onDragEnd={handleDragEvent}>
            <div style={{ display: 'flex', columnGap: '1rem' }}>
                <GridContainer>
                    {containers.map((id) => {
                        return (
                            <div
                                key={id}
                                style={{
                                    backgroundColor: '#363942',
                                    borderRadius: '5px',
                                    padding: '1rem',
                                }}
                            >
                                <H2 style={{ margin: '0 0.4rem' }}>
                                    {id === 'NOT_STARTED'
                                        ? 'Not started'
                                        : id === 'IN_PROGRESS'
                                        ? 'In progress'
                                        : 'Done'}
                                </H2>
                                <div
                                    style={{
                                        display: 'flex',
                                        marginTop: '1rem',
                                    }}
                                >
                                    <Droppable id={id}>
                                        {id === 'NOT_STARTED' ? (
                                            todos.map((todo) => {
                                                return (
                                                    <React.Fragment
                                                        key={todo.todo_id}
                                                    >
                                                        {todo.status ===
                                                            'NOT_STARTED' && (
                                                            <Draggable
                                                                key={
                                                                    todo.todo_id
                                                                }
                                                                id={String(
                                                                    todo.todo_id
                                                                )}
                                                            >
                                                                <div>
                                                                    <p>
                                                                        {
                                                                            todo.title
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </Draggable>
                                                        )}
                                                    </React.Fragment>
                                                );
                                            })
                                        ) : (
                                            <></>
                                        )}
                                        {id === 'IN_PROGRESS' ? (
                                            todos.map((todo) => {
                                                return (
                                                    <React.Fragment
                                                        key={todo.todo_id}
                                                    >
                                                        {todo.status ===
                                                            'IN_PROGRESS' && (
                                                            <Draggable
                                                                id={String(
                                                                    todo.todo_id
                                                                )}
                                                            >
                                                                <div>
                                                                    <p>
                                                                        {
                                                                            todo.title
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </Draggable>
                                                        )}
                                                    </React.Fragment>
                                                );
                                            })
                                        ) : (
                                            <></>
                                        )}
                                        {id === 'DONE' ? (
                                            todos.map((todo) => {
                                                return (
                                                    <React.Fragment
                                                        key={todo.todo_id}
                                                    >
                                                        {todo.status ===
                                                            'DONE' && (
                                                            <Draggable
                                                                id={String(
                                                                    todo.todo_id
                                                                )}
                                                            >
                                                                <div>
                                                                    <p>
                                                                        {
                                                                            todo.title
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </Draggable>
                                                        )}
                                                    </React.Fragment>
                                                );
                                            })
                                        ) : (
                                            <></>
                                        )}
                                    </Droppable>
                                </div>
                            </div>
                        );
                    })}
                </GridContainer>
            </div>
        </DndContext>
    );
};

export default TodoBoard;
