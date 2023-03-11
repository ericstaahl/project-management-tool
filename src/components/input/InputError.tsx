import styled from '@emotion/styled';
import React from 'react';

const ErrorSpan = styled.span({
    fontSize: '0.8rem',
    color: 'red',
});

const InputError = (
    props: React.HtmlHTMLAttributes<HTMLSpanElement>
): JSX.Element => {
    return <ErrorSpan {...props} />;
};

export default InputError;
