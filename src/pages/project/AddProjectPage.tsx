import React from 'react';
import styled from '@emotion/styled';
import Button from '../../components/styled/Button';
import Container from '../../components/styled/Container';
import Input from '../../components/styled/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAddProject from '../../hooks/project/useAddProject';
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
        addProject.mutate(data);
    };

    return (
        <Container>
            <h2 style={{ marginBottom: '1rem' }}>Create new project</h2>
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
                        <label htmlFor='start_date'>Start date</label>
                        {errors.start_date !== undefined && (
                            <InputError>* Required</InputError>
                        )}{' '}
                    </InputLabelWrapper>

                    <Input
                        {...register('start_date', { required: true })}
                        type='date'
                    />
                </InputContainer>

                <InputContainer>
                    <InputLabelWrapper>
                        <label htmlFor='due_date'>Due date</label>
                        {errors.due_date !== undefined && (
                            <InputError>* Required</InputError>
                        )}{' '}
                    </InputLabelWrapper>

                    <Input
                        {...register('due_date', {
                            required: true,
                        })}
                        type='date'
                    />
                </InputContainer>

                <InputContainer>
                    <InputLabelWrapper>
                        <label htmlFor='description'>Description</label>
                        {errors.description !== undefined &&
                            errors.description.type === 'maxLength' && (
                                <InputError>* Max 500 characters</InputError>
                            )}{' '}
                    </InputLabelWrapper>

                    <TextArea
                        rows={6}
                        {...register('description', {
                            maxLength: 500,
                        })}
                    />
                </InputContainer>

                <Button disabled={addProject.isLoading} type='submit'>
                    Save
                </Button>
            </StyledForm>
        </Container>
    );
};

export default AddProjectPage;
