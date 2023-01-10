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
  border: '0.1rem solid #f5f5f5',
  borderRadius: '0.2rem',
});

const StyledButton = styled.button({
  alignSelf: 'start',
  backgroundColor: '#1927c2',
  padding: '0.3rem 0.5rem 0.3rem 0.5rem',
  border: '0.1rem solid #1927c2',
  borderRadius: '0.2rem',
  minWidth: '65px',
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

const CreateProjectPage: React.FC = () => {
  const [newProject, setNewProject] = useState<Project | null>(null);
  const [inputErrors, setInputErrors] = useState<inputErrors>({
    title: false,
    start_date: false,
    due_date: false,
  });
  const addProject = useAddProject();

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
      <h2 style={{ marginBottom: '1rem' }}>Create new project</h2>
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
            // required={true}
          />
        </InputContainer>

        <StyledButton type={'submit'}>Save</StyledButton>
      </StyledForm>
    </Container>
  );
};

export default CreateProjectPage;
