import React from 'react';
import styled from '@emotion/styled';
import Button from '../../components/styled/Button';
import Container from '../../components/styled/Container';
import Input from '../../components/styled/Input';
import useRegisterUser from '../../hooks/user/useRegisterUser';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputError from '../../components/input/InputError';

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

interface FormValues {
    username: string;
    password: string;
}

const RegisterUserPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const registerUser = useRegisterUser();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        registerUser.mutate(data);
        // }
    };

    return (
        <Container>
            <h2 style={{ marginBottom: '1rem' }}>Register</h2>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <InputContainer>
                    <InputLabelWrapper>
                        <label htmlFor='username'>Username</label>
                        {errors.username !== undefined && (
                            <InputError>* Required</InputError>
                        )}
                    </InputLabelWrapper>

                    <Input
                        type='text'
                        {...register('username', { required: true })}
                        // required={true}
                    />
                </InputContainer>

                <InputContainer>
                    <InputLabelWrapper>
                        <label htmlFor='password'>Password</label>
                        {errors.password !== undefined && (
                            <InputError>* Required</InputError>
                        )}
                    </InputLabelWrapper>

                    <Input
                        type='password'
                        {...register('password', { required: true })}
                        // required={true}
                    />
                </InputContainer>

                <Button type='submit'>Register</Button>
            </StyledForm>
        </Container>
    );
};

export default RegisterUserPage;
