import React from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';
import InputError from './InputError';

interface Props<T extends FieldValues> {
    errors: FieldErrors<T>;
}

const TitleError = <T extends FieldValues>({
    errors,
}: Props<T>): JSX.Element => {
    return (
        <>
            {errors.title?.type === 'required' && (
                <InputError>* Required</InputError>
            )}
            {errors.title?.type === 'maxLength' && (
                <InputError>* Max 20 characters</InputError>
            )}
            {errors.title?.type === 'minLength' && (
                <InputError>* Min. 3 characters</InputError>
            )}
        </>
    );
};

export default TitleError;
