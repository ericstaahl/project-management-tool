import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useUpdateProject from '../../hooks/project/useUpdateProject';
import Button from '../../components/styled/Button';
import Container from '../../components/styled/Container';
import Input from '../../components/styled/Input';
import useGetProject from '../../hooks/project/useGetProject';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import useDeleteProject from '../../hooks/project/useDeleteProject';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextArea from '../../components/styled/TextArea';
import InputError from '../../components/input/InputError';
import InputLabelWrapper from '../../components/input/InputLabelWrapper';
import InputContainer from '../../components/input/InputContainer';
import { toast } from 'react-toastify';
import ButtonContainer from '../../components/styled/ButtonContainer';

interface FormValues {
    title: string;
    start_date: string;
    due_date: string;
    description: string;
}

const StyledForm = styled.form({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '0.8rem',
});

const EditProjectPage: React.FC = () => {
    const { id: projectId } = useParams();
    const { data: project, refetch } = useGetProject(projectId);
    const updateProject = useUpdateProject();
    const deleteProject = useDeleteProject();
    const [initialRender, setInitialRender] = useState(true);

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

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (projectId === undefined) return;

        updateProject.mutate(
            { updatedProject: data, projectId },
            {
                onSuccess: () => {
                    toast.success('Updated project.');
                    refetch()
                        .then()
                        .catch(() => {
                            toast.error(
                                'An error occured while refetching query.'
                            );
                        });
                },
                onError: () => {
                    toast.error('An error occured while updating the project.');
                },
            }
        );
    };

    const handleDeleteProject = (): void => {
        if (projectId !== undefined) deleteProject.mutate({ projectId });
    };

    const handleToggleCompleted = (): void => {
        if (project === undefined) return;
        const projectCopy = { ...project };
        projectCopy.complete = !projectCopy.complete;
        updateProject.mutate(
            {
                updatedProject: projectCopy,
                projectId: String(project?.project_id),
            },
            {
                onSuccess: () => {
                    toast.success('Updated completed status.');
                    void (async () => {
                        await refetch();
                    })();
                },
                onError: () => {
                    toast.error(
                        'An error occured while updating the completed status.'
                    );
                },
            }
        );
    };

    return (
        <Container>
            {project !== undefined && (
                <>
                    <h2 style={{ marginBottom: '1rem' }}>Edit project</h2>

                    <StyledForm onSubmit={handleSubmit(onSubmit)}>
                        <InputContainer>
                            <InputLabelWrapper>
                                <label htmlFor='title'>Title</label>
                                {errors.title?.type === 'required' && (
                                    <InputError>* Required</InputError>
                                )}
                                {errors.title?.type === 'maxLength' && (
                                    <InputError>* Max 20 characters</InputError>
                                )}
                                {errors.title?.type === 'minLength' && (
                                    <InputError>* Min. 3 characters</InputError>
                                )}
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
                                        <InputError>
                                            * Max 500 characters
                                        </InputError>
                                    )}{' '}
                            </InputLabelWrapper>

                            <TextArea
                                rows={6}
                                {...register('description', {
                                    maxLength: 500,
                                })}
                            />
                        </InputContainer>
                        <ButtonContainer>
                            <Button type='submit'>Save</Button>
                            <Button onClick={resetValues}>Reset</Button>
                            <Button onClick={handleDeleteProject}>
                                Delete
                            </Button>
                            <Button
                                onClick={() => {
                                    handleToggleCompleted();
                                }}
                            >
                                {project.complete
                                    ? 'Mark as uncomplete'
                                    : 'Mark as complete'}
                            </Button>
                        </ButtonContainer>
                    </StyledForm>
                </>
            )}
        </Container>
    );
};

export default EditProjectPage;
