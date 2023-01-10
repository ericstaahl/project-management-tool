import React, { useState } from 'react';
import styled from '@emotion/styled';
import useAddProject from '../hooks/useAddProject';

const Container = styled.div({
  borderRadius: '5px',
  backgroundColor: '#1c1c1c',
  margin: '1rem',
  padding: '2rem',
});

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

const StyledInput = styled.input({
  padding: '0.3rem',
  fontFamily: 'inherit',
});

interface Project {
  title?: string;
  project_id?: number;
  number_of_members?: number;
  start_date?: string;
  due_date?: string;
}

const CreateProjectPage: React.FC = () => {
  const [newProject, setNewProject] = useState<Project | null>(null);
  const addProject = useAddProject();

  const onSubmitFunction = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(newProject);
    if (newProject !== null) {
      addProject.mutate(newProject);
    }
  };

  return (
    <Container>
      <h2 style={{ marginBottom: '1rem' }}>Create new project</h2>
      <StyledForm onSubmit={onSubmitFunction}>
        <InputContainer>
          <label htmlFor='title'>Title</label>
          <StyledInput
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
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor='start_date'>Start date</label>
          <StyledInput
            onChange={(e) => {
              if (newProject !== null) {
                const newProjectCopy = { ...newProject };
                newProjectCopy.start_date = e.target.value;
                setNewProject(newProjectCopy);
                return;
              }
              const newProjectCopy = { start_date: e.target.value };
              setNewProject(newProjectCopy);
            }}
            name='start_date'
            type='date'
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor='due_date'>Due date</label>
          <StyledInput
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
          />
        </InputContainer>
        <button
          style={{
            alignSelf: 'start',
            backgroundColor: '#1927c2',
            padding: '0.3rem 0.5rem 0.3rem 0.5rem',
            border: '0.1rem solid #1927c2',
            borderRadius: '0.2rem',
            minWidth: '65px',
          }}
          type='submit'
        >
          Save
        </button>
      </StyledForm>
    </Container>
  );
};

export default CreateProjectPage;
