import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from '../components/styled/Button';
import Container from '../components/styled/Container';
import Input from '../components/styled/Input';
import useRegisterUser from '../hooks/user/useRegisterUser';

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

interface User {
  username: string;
  password: string;
}

interface inputErrors {
  username: boolean;
  password: boolean;
}

const RegisterUserPage: React.FC = () => {
  const [newUser, setNewUser] = useState<Partial<User>>({});

  const registerUser = useRegisterUser();

  const [inputErrors, setInputErrors] = useState<inputErrors>({
    username: false,
    password: false,
  });

  const onChangeFunction = <K extends keyof User>(
    objectKey: K,
    value: User[K]
  ): void => {
    const newUserCopy = { ...newUser };
    if (newUserCopy !== null) {
      newUserCopy[objectKey] = value;
      setNewUser(newUserCopy);
    }
  };

  const onSubmitFunction = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const inputErrorKeys = Object.keys(inputErrors);
    // reset errors
    const newInputErrors = {
      username: false,
      password: false,
    };

    // Get keys from the inputError object to check if they have correct values (or values at all)
    inputErrorKeys.forEach((key) => {
      if (newUser !== null) {
        if (
          newUser[key as keyof User] === null ||
          newUser[key as keyof User] === '' ||
          newUser[key as keyof User] === undefined
        ) {
          newInputErrors[key as keyof inputErrors] = true;
        }
      }
    });

    setInputErrors(newInputErrors);

    if (newUser.username !== undefined && newUser.password !== undefined) {
      const dataToSave: User = {
        username: newUser.username,
        password: newUser.password,
      };
      registerUser.mutate(dataToSave);
    } else {
      console.log('Something is undefined');
    }
    // }
  };

  return (
    <Container>
      <h2 style={{ marginBottom: '1rem' }}>Register</h2>
      <StyledForm onSubmit={onSubmitFunction}>
        <InputContainer>
          <InputLabelWrapper>
            <label htmlFor='username'>Username</label>
            {inputErrors.username && (
              <span style={{ fontSize: '0.8rem', color: 'red' }}>
                * Required
              </span>
            )}
          </InputLabelWrapper>

          <Input
            name='username'
            type='text'
            onChange={(e) => {
              onChangeFunction('username', e.currentTarget.value);
            }}
            // required={true}
          />
        </InputContainer>

        <InputContainer>
          <InputLabelWrapper>
            <label htmlFor='password'>Password</label>
            {inputErrors.password && (
              <span style={{ fontSize: '0.8rem', color: 'red' }}>
                * Required
              </span>
            )}
          </InputLabelWrapper>

          <Input
            name='password'
            type='password'
            onChange={(e) => {
              onChangeFunction('password', e.currentTarget.value);
            }}
            // required={true}
          />
        </InputContainer>

        <Button type='submit'>Register</Button>
      </StyledForm>
    </Container>
  );
};

export default RegisterUserPage;
