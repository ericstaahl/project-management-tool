import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from '../components/styled/Button';
import Container from '../components/styled/Container';
import Input from '../components/styled/Input';
import useAddTodo from '../hooks/todo/useAddTodo';
import { Todo as TodoToSave } from '../types/TodoTypes';
import { useParams } from 'react-router-dom';

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

interface Todo {
  title: string;
  estimate: string;
  description: string;
  project_id: number;
}

interface inputErrors {
  title: boolean;
  estimate: boolean;
  description: boolean;
  project_id: boolean;
}

const AddTodoPage: React.FC = () => {
  const { id: projectId } = useParams();

  const [newTodo, setNewTodo] = useState<Partial<TodoToSave>>({
    project_id: Number(projectId),
  });

  const [inputErrors, setInputErrors] = useState<inputErrors>({
    title: false,
    estimate: false,
    description: false,
    project_id: false,
  });

  const addTodo = useAddTodo();

  const onChangeFunction = <K extends keyof TodoToSave>(
    objectKey: K,
    value: TodoToSave[K]
  ): void => {
    const newTodoCopy = { ...newTodo };
    if (newTodoCopy !== null) {
      newTodoCopy[objectKey] = value;
      setNewTodo(newTodoCopy);
    }
  };

  const onSubmitFunction = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const inputErrorKeys = Object.keys(inputErrors);
    // reset errors
    const newInputErrors = {
      title: false,
      estimate: false,
      description: false,
      project_id: false,
    };

    // Get keys from the inputError object to check if they have correct values (or values at all)
    inputErrorKeys.forEach((key) => {
      if (newTodo !== null) {
        if (
          newTodo[key as keyof Todo] === null ||
          newTodo[key as keyof Todo] === '' ||
          newTodo[key as keyof Todo] === undefined
        ) {
          newInputErrors[key as keyof inputErrors] = true;
        }
      }
    });

    setInputErrors(newInputErrors);

    // if (newTodo !== null && !Object.values(newInputErrors).includes(true)) {

    if (
      newTodo.description !== undefined &&
      newTodo.estimate !== undefined &&
      newTodo.project_id !== undefined &&
      newTodo.title !== undefined
    ) {
      const todoToSave: TodoToSave = {
        title: newTodo.title,
        estimate: newTodo.estimate,
        description: newTodo.description,
        project_id: newTodo.project_id,
      };

      addTodo.mutate(todoToSave);
    } else {
      console.log('Something is undefined');
    }
    // }
  };

  return (
    <Container>
      <h2 style={{ marginBottom: '1rem' }}>Add new to-do</h2>
      <StyledForm onSubmit={onSubmitFunction}>
        <InputContainer>
          <InputLabelWrapper>
            <label htmlFor='title'>Title</label>
            {inputErrors.title && (
              <span style={{ fontSize: '0.8rem', color: 'red' }}>
                * Required
              </span>
            )}
          </InputLabelWrapper>

          <Input
            name='title'
            type='text'
            onChange={(e) => {
              onChangeFunction('title', e.currentTarget.value);
            }}
            // required={true}
          />
        </InputContainer>

        <InputContainer>
          <InputLabelWrapper>
            <label htmlFor='estimate'>Estimate</label>
            {inputErrors.estimate && (
              <span style={{ fontSize: '0.8rem', color: 'red' }}>
                * Required
              </span>
            )}
          </InputLabelWrapper>

          <Input
            name='estimate'
            type='text'
            onChange={(e) => {
              onChangeFunction('estimate', e.currentTarget.value);
            }}
            // required={true}
          />
        </InputContainer>

        <InputContainer>
          <InputLabelWrapper>
            <label htmlFor='description'>Description</label>
            {inputErrors.description && (
              <span style={{ fontSize: '0.8rem', color: 'red' }}>
                * Required
              </span>
            )}
          </InputLabelWrapper>

          <Input
            name='description'
            type='text'
            onChange={(e) => {
              onChangeFunction('description', e.currentTarget.value);
            }}
            // required={true}
          />
        </InputContainer>

        <Button type='submit'>Save</Button>
      </StyledForm>
    </Container>
  );
};

export default AddTodoPage;
