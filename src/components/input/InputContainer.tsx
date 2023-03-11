import styled from '@emotion/styled';
import React from 'react';

const StyledInputContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    rowGap: '0.5rem',
});

const InputContainer = (
    props: React.HtmlHTMLAttributes<HTMLDivElement>
): JSX.Element => {
    return <StyledInputContainer {...props} />;
};

export default InputContainer;
