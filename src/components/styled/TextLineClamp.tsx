import React from 'react';
import styled from '@emotion/styled';

const TextContainer = styled.div({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
});

const TextLineClamp: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (
    props
) => {
    return <TextContainer {...props} />;
};

export default TextLineClamp;
