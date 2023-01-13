import React from 'react';
import styled from '@emotion/styled';

const StyledButton = styled.button({
  alignSelf: 'start',
  backgroundColor: '#1927c2',
  padding: '0.3rem 0.5rem 0.3rem 0.5rem',
  border: '0.1rem solid #1927c2',
  borderRadius: '0.2rem',
  minWidth: '65px',
});

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return <StyledButton type={'button'} {...props} />;
};

export default Button;
