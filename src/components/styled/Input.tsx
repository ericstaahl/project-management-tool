import React from 'react';
import styled from '@emotion/styled';

const StyledInput = styled.input({
  padding: '0.3rem',
  fontFamily: 'inherit',
  border: '0.1rem solid #f5f5f5',
  borderRadius: '0.2rem',
});

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return <StyledInput {...props} />;
};

export default Input;
