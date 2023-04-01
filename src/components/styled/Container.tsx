import React from 'react';
import styled from '@emotion/styled';
import { breakpoints } from '../../lib/breakpoints';

const StyledContainer = styled.div`
    border-radius: 5px;
    background-color: #1c1c1c;
    margin: 0.5rem;
    padding: 1rem;
    box-shadow: 0 0 0.2rem #111;
    @media (min-width: ${breakpoints.md}) {
        margin: 1rem;
        padding: 2rem;
    }
`;

const Container: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (
    props
) => {
    return <StyledContainer {...props} />;
};

export default Container;
