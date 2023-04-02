import React from 'react';
import styled from '@emotion/styled';
import { breakpoints } from '../../lib/breakpoints';

const StyledContainer = styled.div`
    margin: 0.5rem;
    padding: 1rem;
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
