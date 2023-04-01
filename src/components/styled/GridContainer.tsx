import styled from '@emotion/styled';
import React from 'react';
import { breakpoints } from '../../lib/breakpoints';

const Grid = styled.div`
    display: grid;
    margin: 1rem 0;
    grid-template-columns: 1fr;
    column-gap: 1rem;
    row-gap: 1rem;
    @media (min-width: ${breakpoints.md}) {
        grid-template-columns: 1fr 1fr;
    }
    @media (min-width: ${breakpoints.lg}) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

const GridContainer: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (
    props
) => {
    return <Grid {...props} />;
};

export default GridContainer;
