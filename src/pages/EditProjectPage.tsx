import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useUpdateProject from '../hooks/project/useUpdateProject';
import Button from '../components/styled/Button';
import Container from '../components/styled/Container';
import Input from '../components/styled/Input';
import useGetProject from '../hooks/project/useGetProject';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

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

interface Project {
    title?: string;
    project_id?: number;
    number_of_members?: number;
    start_date?: string;
    due_date?: string;
}

interface inputErrors {
    title?: boolean;
    start_date?: boolean;
    due_date?: boolean;
}

const EditProjectPage: React.FC = () => {
    const { id: projectId } = useParams();
    const { data: project } = useGetProject(projectId);
    const [updatedProject, setUpdatedProject] = useState<Project | null>({
        due_date: dayjs(project?.due_date).format('YYYY-MM-DD'),
        number_of_members: project?.project_id,
        project_id: project?.project_id,
        start_date: dayjs(project?.start_date).format('YYYY-MM-DD'),
        title: project?.title,
    });
    const [inputErrors, setInputErrors] = useState<inputErrors>({
        title: false,
        start_date: false,
        due_date: false,
    });
    const updateProject = useUpdateProject();
    const [initialRender, setInitialRender] = useState(true);

    const resetProject = (): void => {
        setUpdatedProject({
            due_date: dayjs(project?.due_date).format('YYYY-MM-DD'),
            number_of_members: project?.project_id,
            project_id: project?.project_id,
            start_date: dayjs(project?.start_date).format('YYYY-MM-DD'),
            title: project?.title,
        });
    };

    useEffect(() => {
        if (project !== undefined && initialRender) {
            setUpdatedProject({
                due_date: dayjs(project?.due_date).format('YYYY-MM-DD'),
                number_of_members: project?.number_of_members,
                project_id: project?.project_id,
                start_date: dayjs(project?.start_date).format('YYYY-MM-DD'),
                title: project?.title,
            });
            setInitialRender(false);
        }
    }, [project]);

    const onSubmitFunction = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // if updatedProject has any values, check if they are ok
        if (updatedProject !== null) {
            const inputErrorKeys = Object.keys(inputErrors);
            // reset errors
            const newInputErrors = {
                title: false,
                start_date: false,
                due_date: false,
            };
            // Get keys from the inputError object to check if they have correct values (or values at all)
            inputErrorKeys.forEach((key) => {
                if (
                    updatedProject[key as keyof Project] === null ||
                    updatedProject[key as keyof Project] === '' ||
                    updatedProject[key as keyof Project] === undefined
                ) {
                    newInputErrors[key as keyof inputErrors] = true;
                }
            });

            setInputErrors(newInputErrors);

            if (
                updatedProject !== null &&
                !Object.values(newInputErrors).includes(true) &&
                projectId !== undefined
            ) {
                updateProject.mutate({ updatedProject, projectId });
            }
            // if updatedProject is null, set all values to true.
        } else {
            const newInputErrors = { ...inputErrors };
            const inputErrorKeys = Object.keys(newInputErrors);

            inputErrorKeys.forEach((key) => {
                newInputErrors[key as keyof inputErrors] = true;
                setInputErrors(newInputErrors);
            });
        }
    };
    return (
        <Container>
            <h2 style={{ marginBottom: '1rem' }}>Edit project</h2>
            <StyledForm onSubmit={onSubmitFunction}>
                <InputContainer>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <label htmlFor='title'>Title</label>
                        {inputErrors.title === true && (
                            <span style={{ fontSize: '0.8rem', color: 'red' }}>
                                * Required
                            </span>
                        )}
                    </div>

                    <Input
                        onChange={(e) => {
                            if (updatedProject !== null) {
                                const updatedProjectCopy = {
                                    ...updatedProject,
                                };
                                updatedProjectCopy.title = e.target.value;
                                setUpdatedProject(updatedProjectCopy);
                                return;
                            }
                            const updatedProjectCopy = {
                                title: e.target.value,
                            };
                            setUpdatedProject(updatedProjectCopy);
                        }}
                        name='title'
                        type='text'
                        value={updatedProject?.title ?? ''}
                        // required={true}
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
                        {inputErrors.start_date === true && (
                            <span style={{ fontSize: '0.8rem', color: 'red' }}>
                                * Required
                            </span>
                        )}{' '}
                    </div>

                    <Input
                        onChange={(e) => {
                            if (updatedProject !== null) {
                                const updatedProjectCopy = {
                                    ...updatedProject,
                                };
                                updatedProjectCopy.start_date = e.target.value;
                                setUpdatedProject(updatedProjectCopy);
                                return;
                            }
                            const updatedProjectCopy = {
                                start_date: e.target.value,
                            };
                            setUpdatedProject(updatedProjectCopy);
                        }}
                        name='start_date'
                        type='date'
                        value={updatedProject?.start_date ?? ''}
                        // required={true}
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
                        {inputErrors.due_date === true && (
                            <span style={{ fontSize: '0.8rem', color: 'red' }}>
                                * Required
                            </span>
                        )}{' '}
                    </div>

                    <Input
                        onChange={(e) => {
                            if (updatedProject !== null) {
                                const updatedProjectCopy = {
                                    ...updatedProject,
                                };
                                updatedProjectCopy.due_date = e.target.value;
                                setUpdatedProject(updatedProjectCopy);
                                return;
                            }
                            const updatedProjectCopy = {
                                due_date: e.target.value,
                            };
                            setUpdatedProject(updatedProjectCopy);
                        }}
                        name='due_date'
                        type='date'
                        value={updatedProject?.due_date ?? ''}
                        // required={true}
                    />
                </InputContainer>
                <div style={{ display: 'flex', columnGap: '1rem' }}>
                    <Button type='submit'>Save</Button>
                    <Button onClick={resetProject}>Reset</Button>
                </div>
            </StyledForm>
        </Container>
    );
};

export default EditProjectPage;
