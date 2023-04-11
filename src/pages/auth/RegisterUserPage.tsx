import React from 'react';
import styled from '@emotion/styled';
import Button from '../../components/styled/Button';
import Container from '../../components/styled/Container';
import Input from '../../components/styled/Input';
import useRegisterUser from '../../hooks/user/useRegisterUser';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputError from '../../components/input/InputError';
import InputLabelWrapper from '../../components/input/InputLabelWrapper';
import InputContainer from '../../components/input/InputContainer';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';

const StyledForm = styled.form({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '0.8rem',
});

interface FormValues {
    username: string;
    password: string;
}

interface ErrorResponse {
    statusCode: number;
    error: string;
    message: string;
}

const RegisterUserPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const registerUser = useRegisterUser();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        registerUser.mutate(data, {
            onSuccess: (res) => {
                toast.success('Successfully registered.');
            },
            onError: (err) => {
                console.log('An error occured when trying to register.');
                if (isAxiosError<ErrorResponse>(err)) {
                    if (err.response?.data.message !== undefined) {
                        toast.error(err.response?.data.message);
                    }
                }
            },
        });
    };

    return (
        <Container>
            <h2 style={{ marginBottom: '1rem' }}>Register</h2>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <InputContainer>
                    <InputLabelWrapper>
                        <label htmlFor='username'>Username</label>
                        {errors.username?.type === 'required' && (
                            <InputError>* Required</InputError>
                        )}
                        {errors.username?.type === 'minLength' && (
                            <InputError>* Min. 5 characters</InputError>
                        )}
                    </InputLabelWrapper>

                    <Input
                        type='text'
                        {...register('username', {
                            required: true,
                            minLength: 5,
                        })}
                    />
                </InputContainer>

                <InputContainer>
                    <InputLabelWrapper>
                        <label htmlFor='password'>Password</label>
                        {errors.password?.type === 'required' && (
                            <InputError>* Required</InputError>
                        )}
                        {errors.password?.type === 'minLength' && (
                            <InputError>* Min. 8 characters</InputError>
                        )}
                    </InputLabelWrapper>

                    <Input
                        type='password'
                        {...register('password', {
                            required: true,
                            minLength: 8,
                        })}
                    />
                </InputContainer>

                <Button type='submit'>Register</Button>
            </StyledForm>
        </Container>
    );
};

export default RegisterUserPage;
