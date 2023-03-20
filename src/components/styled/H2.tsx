import React from 'react';
import styled from '@emotion/styled';

const StyledH2 = styled.h2({
    margin: '1rem 0',
    fontSize: '1.3rem',
});

const H2: React.FC<React.HtmlHTMLAttributes<HTMLHeadingElement>> = (props) => {
    return <StyledH2 {...props} />;
};

export default H2;
