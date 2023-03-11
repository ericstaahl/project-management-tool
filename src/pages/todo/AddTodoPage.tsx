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

const AddTodoPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>();
    const { id: projectId } = useParams();
    const navigate = useNavigate();

    // const [selectedUser, setSelectedUser] = React.useState<{
    //     value: string;
    //     label: string;
    // }>();

    // const handleSetSelectedUser = (selected: {
    //     label: string;
    //     value: string;
    // }): void => {
    //     setSelectedUser(selected);
    // };

    const addTodo = useAddTodo();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const todoToSave: TodoToSave = {
            title: data.title,
            estimate: data.estimate,
            description: data.description,
            project_id: Number(projectId),
            assignee: data?.assignee?.value,
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

                <Button type='submit'>Save</Button>
            </StyledForm>
        </Container>
    );
};

export default AddTodoPage;
