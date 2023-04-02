import styled from '@emotion/styled';
import React from 'react';

const Container = styled.div({
    padding: '1rem 0',
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: '1rem',
    rowGap: '1rem',
});

const ButtonContainer: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (
    props
) => {
    return <Container {...props} />;
};

export default ButtonContainer;
