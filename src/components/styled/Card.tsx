import React from 'react';
import styled from '@emotion/styled';

const StyledDiv = styled.div({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '0.5rem',
    borderRadius: '5px',
    minHeight: '200px',
    backgroundColor: '#363942',
    padding: '1rem',
});

const Card: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
    return <StyledDiv {...props} />;
};

export default Card;
