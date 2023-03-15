import React, { useEffect, useMemo, useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Container from '../styled/Container';
import Droppable from './Droppable';
import Draggable from './Draggable';
import { Todos } from '../../types/TodoTypes';

interface Props {
    data: Todos;
}

const containers = [
    'NOT_STARTED' as const,
    'IN_PROGRESS' as const,
    'DONE' as const,
];

const TodoBoard = ({ data: todos }: Props): JSX.Element => {
    const [todoState, setTodoState] = useState<Todos>();
    const [initialRender, setInitialRender] = useState(true);

    const resetValues = (): void => {
        if (todos !== undefined) {
            setTodoState(todos);
        }
    };
    useEffect(() => {
        if (todos !== undefined && initialRender) {
            resetValues();
            setInitialRender(false);
        }
    }, [todos]);

    const handleDragEvent = (event: DragEndEvent): void => {
        const { over } = event;
        if (todoState === undefined) return;
        const newTodoState = todoState.map((todo) => {
            if (todo.todo_id === over?.id) return todo;
            return todo;
        });
        setTodoState(newTodoState);
    };

    const todosNotStarted = useMemo(() => {
        const todos: JSX.Element[] = [];
        todoState?.forEach((todo) => {
            if (todo.status === 'NOT_STARTED')
                todos.push(
                    <Draggable key={todo.todo_id} id={String(todo.todo_id)}>
                        <div>
                            <p>{todo.title}</p>
                        </div>
                    </Draggable>
                );
        });
        return todos;
    }, [todoState]);

    const todosInProgress = useMemo(() => {
        const todos: JSX.Element[] = [];
        todoState?.forEach((todo) => {
            if (todo.status === 'IN_PROGRESS')
                todos.push(
                    <Draggable key={todo.todo_id} id={String(todo.todo_id)}>
                        <div>
                            <p>{todo.title}</p>
                        </div>
                    </Draggable>
                );
        });
        return todos;
    }, []);

    const todosDone = useMemo(() => {
        const todos: JSX.Element[] = [];
        todoState?.forEach((todo) => {
            if (todo.status === 'DONE')
                todos.push(
                    <Draggable key={todo.todo_id} id={String(todo.todo_id)}>
                        <div>
                            <p>{todo.title}</p>
                        </div>
                    </Draggable>
                );
        });
        return todos;
    }, []);

    return (
        <Container>
            <DndContext onDragEnd={handleDragEvent}>
                <div style={{ display: 'flex', columnGap: '1rem' }}>
                    {containers.map((id) => {
                        console.log(id);
                        return (
                            <Droppable key={id} id={id}>
                                {id === 'NOT_STARTED' ? (
                                    todosNotStarted.map((draggable) => {
                                        console.log('RUNNING!');
                                        return draggable;
                                    })
                                ) : (
                                    <></>
                                )}
                                {id === 'IN_PROGRESS' ? (
                                    todosInProgress.map((draggable) => {
                                        console.log('RUNNING!');
                                        return draggable;
                                    })
                                ) : (
                                    <></>
                                )}
                                {id === 'DONE' ? (
                                    todosDone.map((draggable) => {
                                        console.log('RUNNING!');
                                        return draggable;
                                    })
                                ) : (
                                    <></>
                                )}
                            </Droppable>
                        );
                    })}
                </div>
            </DndContext>
        </Container>
    );
};

export default TodoBoard;
