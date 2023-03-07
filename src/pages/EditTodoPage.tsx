import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Button from '../components/styled/Button';
import Container from '../components/styled/Container';
import Input from '../components/styled/Input';
import { UpdatedTodo } from '../types/TodoTypes';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import UserSelect from '../components/UserSelect';
import useGetTodo from '../hooks/todo/useGetTodo';
import useUpdateTodo from '../hooks/todo/useUpdateTodo';
import TextArea from '../components/styled/TextArea';
import { useQueryClient } from '@tanstack/react-query';
import todoQueryKeys from '../query-keys/todoQueryKeys';
import useDeleteTodo from '../hooks/todo/useDeleteTodo';

const InputContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    rowGap: '0.5rem',
});

const StyledForm = styled.form({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '0.8rem',
});

const InputLabelWrapper = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

interface FormValues {
    title: string;
    estimate: string;
    description: string;
    assignee?: {
        label: string;
        value: string;
    };
}

const EditTodoPage: React.FC = () => {
    const { id: projectId, todoId } = useParams();
    const { data: todo } = useGetTodo(projectId, todoId);
    console.log('todo', todo);
    const updateTodo = useUpdateTodo();
    // const deleteTodo = useDeleteTodo();
    const [initialRender, setInitialRender] = useState(true);
    const queryClient = useQueryClient();
    const deleteTodo = useDeleteTodo();

    const handleDeleteTodo = (): void => {
        if (projectId === undefined || todoId === undefined) return;
        deleteTodo.mutate({ projectId, todoId });
    };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm<FormValues>();

    const resetValues = (): void => {
        if (todo !== undefined) {
            setValue('title', todo.title);
            setValue('description', todo.description ?? '');
            setValue('estimate', todo.estimate ?? '');
        }
    };
    useEffect(() => {
        if (todo !== undefined && initialRender) {
            resetValues();
            setInitialRender(false);
        }
    }, [todo]);

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const todoToSave: UpdatedTodo = {
            title: data.title,
            estimate: data.estimate,
            description: data.description,
            assignee: data?.assignee?.value,
        };

        await updateTodo.mutateAsync(
            { updatedTodo: todoToSave, todoId, projectId },
            {
                onSuccess: () => {
                    if (projectId !== undefined) {
                        queryClient
                            .invalidateQueries(todoQueryKeys.lists())
                            .then()
                            .catch((err) => err);
                        navigate(`/projects/${projectId}`);
                    }
                },
            }
        );
    };

    return (
        <Container>
            <h2 style={{ marginBottom: '1rem' }}>Edit to-do</h2>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <InputContainer>
                    <InputLabelWrapper>
                        <label htmlFor='title'>Title</label>
                        {errors.title !== undefined && (
                            <span style={{ fontSize: '0.8rem', color: 'red' }}>
                                * Required
                            </span>
                        )}
                    </InputLabelWrapper>

                    <Input
                        {...register('title', { required: true })}
                        type='text'
                        // required={true}
                    />
                </InputContainer>

                <InputContainer>
                    <InputLabelWrapper>
                        <label htmlFor='estimate'>Estimate</label>
                        {errors.estimate !== undefined && (
                            <span style={{ fontSize: '0.8rem', color: 'red' }}>
                                * Required
                            </span>
                        )}
                    </InputLabelWrapper>

                    <Input
                        {...register('estimate', { required: true })}
                        type='text'
                        // required={true}
                    />
                </InputContainer>

                <InputContainer>
                    <InputLabelWrapper>
                        <label htmlFor='description'>Description</label>
                        {errors.description !== undefined && (
                            <span style={{ fontSize: '0.8rem', color: 'red' }}>
                                * Required
                            </span>
                        )}
                    </InputLabelWrapper>

                    <TextArea
                        {...register('description', { required: true })}
                        rows={4}
                    />
                </InputContainer>

                <InputContainer>
                    <InputLabelWrapper>
                        <label htmlFor='description'>Assignee</label>
                    </InputLabelWrapper>

                    <UserSelect<FormValues>
                        control={control}
                        name='assignee'
                        projectId={Number(projectId)}
                    />
                </InputContainer>

                <div style={{ display: 'flex', columnGap: '1rem' }}>
                    <Button type='submit'>Save</Button>
                    <Button onClick={resetValues}>Reset</Button>
                    <Button onClick={handleDeleteTodo}>Delete</Button>
                </div>
            </StyledForm>
        </Container>
    );
};

export default EditTodoPage;
