import React from 'react';
import styled from '@emotion/styled';

const StyledH3 = styled.h3({
    margin: '0',
});

const H3: React.FC<React.HtmlHTMLAttributes<HTMLHeadingElement>> = (props) => {
    return <StyledH3 {...props} />;
};

export default H3;
