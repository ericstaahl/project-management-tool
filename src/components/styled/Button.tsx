import React from 'react';
import styled from '@emotion/styled';

const StyledButton = styled.button({
    fontSize: '0.9rem',
    alignSelf: 'start',
    backgroundColor: '#1927c2',
    padding: '0.5rem 1rem',
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
