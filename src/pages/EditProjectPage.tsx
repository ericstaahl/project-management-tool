import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useAddProject from '../hooks/project/useAddProject';
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
    const [newProject, setNewProject] = useState<Project | null>({
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
    const addProject = useAddProject();
    const [initialRender, setInitialRender] = useState(true);

    const resetProject = (): void => {
        setNewProject({
            due_date: dayjs(project?.due_date).format('YYYY-MM-DD'),
            number_of_members: project?.project_id,
            project_id: project?.project_id,
            start_date: dayjs(project?.start_date).format('YYYY-MM-DD'),
            title: project?.title,
        });
    };

    useEffect(() => {
        if (project !== undefined && initialRender) {
            setNewProject({
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
        // if newProject has any values, check if they are ok
        if (newProject !== null) {
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
                    newProject[key as keyof Project] === null ||
                    newProject[key as keyof Project] === '' ||
                    newProject[key as keyof Project] === undefined
                ) {
                    newInputErrors[key as keyof inputErrors] = true;
                }
            });

            setInputErrors(newInputErrors);

            if (
                newProject !== null &&
                !Object.values(newInputErrors).includes(true)
            ) {
                addProject.mutate(newProject);
            }
            // if newProject is null, set all values to true.
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
                            if (newProject !== null) {
                                const newProjectCopy = { ...newProject };
                                newProjectCopy.title = e.target.value;
                                setNewProject(newProjectCopy);
                                return;
                            }
                            const newProjectCopy = { title: e.target.value };
                            setNewProject(newProjectCopy);
                        }}
                        name='title'
                        type='text'
                        value={newProject?.title ?? ''}
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
                            if (newProject !== null) {
                                const newProjectCopy = { ...newProject };
                                newProjectCopy.start_date = e.target.value;
                                setNewProject(newProjectCopy);
                                return;
                            }
                            const newProjectCopy = {
                                start_date: e.target.value,
                            };
                            setNewProject(newProjectCopy);
                        }}
                        name='start_date'
                        type='date'
                        value={newProject?.start_date ?? ''}
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
                            if (newProject !== null) {
                                const newProjectCopy = { ...newProject };
                                newProjectCopy.due_date = e.target.value;
                                setNewProject(newProjectCopy);
                                return;
                            }
                            const newProjectCopy = { due_date: e.target.value };
                            setNewProject(newProjectCopy);
                        }}
                        name='due_date'
                        type='date'
                        value={newProject?.due_date ?? ''}
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
