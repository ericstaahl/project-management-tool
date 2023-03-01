import React from 'react';
import styled from '@emotion/styled';
import Button from '../components/styled/Button';
import Container from '../components/styled/Container';
import Input from '../components/styled/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAddProject from '../hooks/project/useAddProject';
import TextArea from '../components/styled/TextArea';

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

// interface Project {
//     title?: string;
//     project_id?: number;
//     number_of_members?: number;
//     start_date?: string;
//     due_date?: string;
// }

interface FormValues {
    title: string;
    start_date: string;
    due_date: string;
    description: string;
}

const AddProjectPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const addProject = useAddProject();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data)
        addProject.mutate(data);
    };

    console.log(errors);

    return (
        <Container>
            <h2 style={{ marginBottom: '1rem' }}>Create new project</h2>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <InputContainer>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <label htmlFor='title'>Title</label>
                        {errors.title !== undefined && (
                            <span style={{ fontSize: '0.8rem', color: 'red' }}>
                                * Required
                            </span>
                        )}
                    </div>

                    <Input
                        {...register('title', { required: true })}
                        type='text'
                    />
                </InputContainer>

                <InputContainer>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <label htmlFor='start_date'>Start date</label>
                        {errors.start_date !== undefined && (
                            <span style={{ fontSize: '0.8rem', color: 'red' }}>
                                * Required
                            </span>
                        )}{' '}
                    </div>

                    <Input
                        {...register('start_date', { required: true })}
                        type='date'
                    />
                </InputContainer>

                <InputContainer>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <label htmlFor='due_date'>Due date</label>
                        {errors.due_date !== undefined && (
                            <span style={{ fontSize: '0.8rem', color: 'red' }}>
                                * Required
                            </span>
                        )}{' '}
                    </div>

                    <Input
                        {...register('due_date', {
                            required: true,
                        })}
                        type='date'
                    />
                </InputContainer>

                <InputContainer>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <label htmlFor='description'>Description</label>
                        {errors.description !== undefined &&
                            errors.description.type === 'maxLength' && (
                                <span
                                    style={{ fontSize: '0.8rem', color: 'red' }}
                                >
                                    * Max 500 characters
                                </span>
                            )}{' '}
                    </div>

                    <TextArea
                        rows={6}
                        {...register('description', {
                            maxLength: 500,
                        })}
                    />
                </InputContainer>

                <Button type='submit'>Save</Button>
            </StyledForm>
        </Container>
    );
};

export default AddProjectPage;
