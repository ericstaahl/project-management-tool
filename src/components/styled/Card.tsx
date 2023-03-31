import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../../lib/colors';

const StyledDiv = styled.div({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '0.5rem',
    borderRadius: '5px',
    minHeight: '200px',
    backgroundColor: colors.primary,
    padding: '1rem',
    border: `2px solid ${colors.borderPrimary}`,
});

const Card: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
    return <StyledDiv {...props} />;
};

export default Card;
