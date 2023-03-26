import React from 'react';
import styled from '@emotion/styled';
import Button from '../../components/styled/Button';
import Container from '../../components/styled/Container';
import Input from '../../components/styled/Input';
import useLoginUser from '../../hooks/user/useLoginUser';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUpdateAuth } from '../../context/AuthContext';
import InputError from '../../components/input/InputError';
import InputLabelWrapper from '../../components/input/InputLabelWrapper';
import InputContainer from '../../components/input/InputContainer';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';

const StyledForm = styled.form({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '0.8rem',
});

interface LocationState {
    state: {
        from: { pathname: string } | null;
    } | null;
}

interface FormValues {
    username: string;
    password: string;
}

interface ErrorResponse {
    statusCode: number;
    error: string;
    message: string;
}

const LoginUserPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
    const { state }: LocationState = useLocation();
    const navigate = useNavigate();
    const updateAuthFunc = useUpdateAuth();

    const loginUser = useLoginUser();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        loginUser.mutate(data, {
            onSuccess: (res) => {
                if (updateAuthFunc !== null) updateAuthFunc(res.data);
                toast.success('Successfully logged in');
                if (
                    state?.from?.pathname !== undefined &&
                    state?.from?.pathname.length > 0
                ) {
                    navigate(
                        state.from.pathname.length > 0
                            ? state.from.pathname
                            : '/'
                    );
                } else {
                    navigate('/dashboard');
                }
            },
            onError: (err) => {
                console.log('An error occured when trying to login.');
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
            <h2 style={{ marginBottom: '1rem' }}>Login</h2>
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
                    />
                </InputContainer>

                <Button type='submit'>Login</Button>
            </StyledForm>
        </Container>
    );
};

export default LoginUserPage;
