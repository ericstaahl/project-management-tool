import React from 'react';
import styled from '@emotion/styled';
import Button from '../../components/styled/Button';
import Container from '../../components/styled/Container';
import Input from '../../components/styled/Input';
import useAddTodo from '../../hooks/todo/useAddTodo';
import { Todo as TodoToSave } from '../../types/TodoTypes';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import UserSelect from '../../components/input/UserSelect';
import TextArea from '../../components/styled/TextArea';
import InputError from '../../components/input/InputError';
import InputLabelWrapper from '../../components/input/InputLabelWrapper';
import InputContainer from '../../components/input/InputContainer';
import TitleError from '../../components/input/TitleError';

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

const AddTodoPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>();
    const { id: projectId } = useParams();
    const navigate = useNavigate();

    const addTodo = useAddTodo();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const todoToSave: TodoToSave = {
            title: data.title,
            estimate: data.estimate,
            description: data.description,
            project_id: Number(projectId),
            assignee: data?.assignee?.value ?? null,
        };

        addTodo.mutate(todoToSave, {
            onSuccess: () => {
                if (projectId !== undefined) navigate(`/projects/${projectId}`);
            },
        });
    };

    return (
        <Container>
            <h2 style={{ marginBottom: '1rem' }}>Add new to-do</h2>
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
                    />
                </InputContainer>

                <InputContainer>
                    <InputLabelWrapper>
                        <label htmlFor='description'>Description</label>
                        {errors.description !== undefined &&
                            errors.description.type === 'maxLength' && (
                                <InputError>* Max 255 characters</InputError>
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
                    />
                </InputContainer>

                <Button disabled={addTodo.isLoading} type='submit'>
                    Save
                </Button>
            </StyledForm>
        </Container>
    );
};

export default AddTodoPage;
