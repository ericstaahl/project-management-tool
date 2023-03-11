import React from 'react';
import styled from '@emotion/styled';
import { Link, LinkProps } from 'react-router-dom';

const StyledLink = styled(Link)({
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: '1.5rem',
    textAlign: 'center',
});

const EditLink = ({ children, ...props }: LinkProps): JSX.Element => {
    return <StyledLink {...props}>{children}</StyledLink>;
};

export default EditLink;
