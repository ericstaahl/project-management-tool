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
                {containers.map((id) => {
                    return (
                        <Droppable key={id} id={id}>
                            {id === 'NOT_STARTED' ? (
                                todos.map((todo) => {
                                    return (
                                        <React.Fragment key={todo.todo_id}>
                                            {todo.status === 'NOT_STARTED' && (
                                                <Draggable
                                                    key={todo.todo_id}
                                                    id={String(todo.todo_id)}
                                                >
                                                    <div>
                                                        <p>{todo.title}</p>
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
                                        <React.Fragment key={todo.todo_id}>
                                            {todo.status === 'IN_PROGRESS' && (
                                                <Draggable
                                                    id={String(todo.todo_id)}
                                                >
                                                    <div>
                                                        <p>{todo.title}</p>
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
                                        <React.Fragment key={todo.todo_id}>
                                            {todo.status === 'DONE' && (
                                                <Draggable
                                                    id={String(todo.todo_id)}
                                                >
                                                    <div>
                                                        <p>{todo.title}</p>
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
                    );
                })}
            </div>
        </DndContext>
    );
};

export default TodoBoard;
