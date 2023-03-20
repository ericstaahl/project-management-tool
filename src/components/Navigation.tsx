import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';

const NavContainer = styled.div({
    display: 'flex',
    columnGap: '1.5rem',
    fontSize: '0.8rem',
    alignItems: 'center',
    padding: '1.3rem 0 1.3rem 1rem',
    backgroundColor: '#21262e',
});

const Nav = styled.nav({
    display: 'flex',
    columnGap: '1rem',
    fontSize: '1.1rem',
    fontWeight: '500',
});

const StyledLink = styled(Link)({
    color: '#f5f5f5',
    textDecoration: 'none',
    ':hover': {
        color: '#cfcfcf',
    },
    fontWeight: 500,
});

const StyledH1 = styled.h1({
    fontSize: '1.4rem',
});

const Navigation: React.FC = () => {
    return (
        <NavContainer>
            <StyledH1>Project Mangement Tool</StyledH1>
            <Nav>
                <StyledLink to='/dashboard'>Dashboard</StyledLink>
                <StyledLink to='/projects'>Projects</StyledLink>
                <StyledLink to='/projects/new'>Add project</StyledLink>
                <StyledLink to='/register'>Register</StyledLink>
                <StyledLink to='/login'>Login</StyledLink>
                <StyledLink to='#'>About</StyledLink>
                <StyledLink to='/logout'>Logout</StyledLink>
            </Nav>
        </NavContainer>
    );
};

export default Navigation;
