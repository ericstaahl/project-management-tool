import React, { forwardRef } from 'react';
import styled from '@emotion/styled';

const StyledInput = styled.input({
    padding: '0.3rem',
    fontFamily: 'inherit',
    border: '0.1rem solid #f5f5f5',
    borderRadius: '0.2rem',
});
interface Props extends React.ComponentProps<'input'> {}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
    return <StyledInput {...props} ref={ref} />;
});

Input.displayName = 'Input';

export default Input;
