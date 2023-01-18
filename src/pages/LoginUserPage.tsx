import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from '../components/styled/Button';
import Container from '../components/styled/Container';
import Input from '../components/styled/Input';
import useLoginUser from '../hooks/user/useLoginUser';

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

const LoginUserPage: React.FC = () => {
  const [userCredentials, setUserCredentials] = useState<Partial<User>>({});

  const loginUser = useLoginUser();

  const [inputErrors, setInputErrors] = useState<inputErrors>({
    username: false,
    password: false,
  });

  const onChangeFunction = <K extends keyof User>(
    objectKey: K,
    value: User[K]
  ): void => {
    const userCredentialsCopy = { ...userCredentials };
    if (userCredentialsCopy !== null) {
      userCredentialsCopy[objectKey] = value;
      setUserCredentials(userCredentialsCopy);
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
      if (userCredentials !== null) {
        if (
          userCredentials[key as keyof User] === null ||
          userCredentials[key as keyof User] === '' ||
          userCredentials[key as keyof User] === undefined
        ) {
          newInputErrors[key as keyof inputErrors] = true;
        }
      }
    });

    setInputErrors(newInputErrors);

    if (
      userCredentials.username !== undefined &&
      userCredentials.password !== undefined
    ) {
      const userCredentialsToUse: User = {
        username: userCredentials.username,
        password: userCredentials.password,
      };
      loginUser.mutate(userCredentialsToUse);
    } else {
      console.log('Something is undefined');
    }
    // }
  };

  return (
    <Container>
      <h2 style={{ marginBottom: '1rem' }}>Login</h2>
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

        <Button type='submit'>Login</Button>
      </StyledForm>
    </Container>
  );
};

export default LoginUserPage;
