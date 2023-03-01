import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useUpdateProject from '../hooks/project/useUpdateProject';
import Button from '../components/styled/Button';
import Container from '../components/styled/Container';
import Input from '../components/styled/Input';
import useGetProject from '../hooks/project/useGetProject';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import useDeleteProject from '../hooks/project/useDeleteProject';
import { SubmitHandler, useForm } from 'react-hook-form';
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

const EditProjectPage: React.FC = () => {
    const { id: projectId } = useParams();
    const { data: project } = useGetProject(projectId);
    const updateProject = useUpdateProject();
    const deleteProject = useDeleteProject();
    const [initialRender, setInitialRender] = useState(true);

    interface FormValues {
        title: string;
        start_date: string;
        due_date: string;
        description: string;
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormValues>();

    const resetValues = (): void => {
        if (project !== undefined) {
            setValue('title', project.title);
            setValue('description', project.description ?? '');
            setValue(
                'start_date',
                dayjs(project?.start_date).format('YYYY-MM-DD')
            );
            setValue('due_date', dayjs(project?.due_date).format('YYYY-MM-DD'));
        }
    };
    useEffect(() => {
        if (project !== undefined && initialRender) {
            resetValues();
            setInitialRender(false);
        }
    }, [project]);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        if (projectId !== undefined)
            updateProject.mutate({ updatedProject: data, projectId });
    };

    const handleDeleteProject = (): void => {
        if (projectId !== undefined) deleteProject.mutate({ projectId });
    };
    return (
        <Container>
            <h2 style={{ marginBottom: '1rem' }}>Edit project</h2>

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
                <div style={{ display: 'flex', columnGap: '1rem' }}>
                    <Button type='submit'>Save</Button>
                    <Button onClick={resetValues}>Reset</Button>
                    <Button onClick={handleDeleteProject}>Delete</Button>
                </div>
            </StyledForm>
        </Container>
    );
};

export default EditProjectPage;
