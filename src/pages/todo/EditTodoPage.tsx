import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Button from '../../components/styled/Button';
import Container from '../../components/styled/Container';
import Input from '../../components/styled/Input';
import { UpdatedTodo } from '../../types/TodoTypes';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import UserSelect from '../../components/input/UserSelect';
import useGetTodo from '../../hooks/todo/useGetTodo';
import useUpdateTodo from '../../hooks/todo/useUpdateTodo';
import TextArea from '../../components/styled/TextArea';
import useDeleteTodo from '../../hooks/todo/useDeleteTodo';
import InputError from '../../components/input/InputError';
import InputLabelWrapper from '../../components/input/InputLabelWrapper';
import InputContainer from '../../components/input/InputContainer';
import TitleError from '../../components/input/TitleError';
import useAssignSelf from '../../hooks/todo/useAssignSelf';

const StyledForm = styled.form({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '0.8rem',
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
    const { data: todo, remove, isLoading } = useGetTodo(projectId, todoId);
    console.log('todo', todo);
    const updateTodo = useUpdateTodo();
    const assignSelf = useAssignSelf();
    const [initialRender, setInitialRender] = useState(true);
    const deleteTodo = useDeleteTodo();

    const handleDeleteTodo = (): void => {
        if (projectId === undefined || todoId === undefined) return;
        deleteTodo.mutate({ projectId, todoId });
    };

    console.log('assignee:', todo?.assignee);

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
            setValue('assignee.value', todo.assignee ?? '');
        }
    };
    useEffect(() => {
        if (todo !== undefined && initialRender) {
            resetValues();
            setInitialRender(false);
        }
    }, [todo]);

    const navigate = useNavigate();

    const handleAssignSelf = (): void => {
        assignSelf.mutate(
            { todoId, projectId },
            {
                onSuccess: () => {
                    if (projectId === undefined) return;
                    remove();
                    navigate(`/projects/${projectId}`);
                },
            }
        );
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const todoToSave: UpdatedTodo = {
            title: data.title,
            estimate: data.estimate,
            description: data.description,
            assignee:
                data?.assignee?.value.length !== 0 &&
                data?.assignee?.value !== undefined
                    ? data.assignee?.value
                    : null,
        };

        console.log(todoToSave);

        await updateTodo.mutateAsync(
            { updatedTodo: todoToSave, todoId, projectId },
            {
                onSuccess: () => {
                    if (projectId === undefined) return;
                    remove();
                    navigate(`/projects/${projectId}`);
                },
            }
        );
    };

    return (
        <Container>
            <h2 style={{ marginBottom: '1rem' }}>Edit to-do</h2>
            {!isLoading && todo !== undefined && (
                <StyledForm onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <InputLabelWrapper>
                            <label htmlFor='title'>Title</label>
                            <TitleError errors={errors} />
                        </InputLabelWrapper>

                        <Input
                            {...register('title', {
                                required: true,
                                minLength: 3,
                                maxLength: 20,
                            })}
                            type='text'
                        />
                    </InputContainer>

                    <InputContainer>
                        <InputLabelWrapper>
                            <label htmlFor='estimate'>Estimate</label>
                            {errors.estimate !== undefined && (
                                <InputError>* Required</InputError>
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
                            {errors.description !== undefined &&
                                errors.description.type === 'maxLength' && (
                                    <InputError>
                                        * Max 255 characters
                                    </InputError>
                                )}{' '}
                        </InputLabelWrapper>

                        <TextArea
                            {...register('description', {
                                maxLength: 255,
                            })}
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
                            defaultInputValue={todo?.assignee ?? undefined}
                        />
                    </InputContainer>

                    <div style={{ display: 'flex', columnGap: '1rem' }}>
                        <Button disabled={updateTodo.isLoading} type='submit'>
                            Save
                        </Button>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                handleAssignSelf();
                            }}
                        >
                            Assign yourself
                        </Button>
                        <Button onClick={resetValues}>Reset</Button>
                        <Button
                            disabled={deleteTodo.isLoading}
                            onClick={handleDeleteTodo}
                        >
                            Delete
                        </Button>
                    </div>
                </StyledForm>
            )}
        </Container>
    );
};

export default EditTodoPage;
