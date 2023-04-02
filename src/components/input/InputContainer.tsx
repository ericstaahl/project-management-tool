import styled from '@emotion/styled';
import React from 'react';
import { breakpoints } from '../../lib/breakpoints';

const StyledInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    @media (min-width: ${breakpoints.md}px) {
        width: 50%;
    }
`;

const InputContainer = (
    props: React.HtmlHTMLAttributes<HTMLDivElement>
): JSX.Element => {
    return <StyledInputContainer {...props} />;
};

export default InputContainer;
