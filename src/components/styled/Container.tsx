import React from 'react';
import styled from '@emotion/styled';

const StyledContainer = styled.div({
    borderRadius: '5px',
    backgroundColor: '#1c1c1c',
    margin: '1rem',
    padding: '2rem',
});

const Container: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (
    props
) => {
    return <StyledContainer {...props} />;
};

export default Container;
