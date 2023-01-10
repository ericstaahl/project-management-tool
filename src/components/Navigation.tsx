import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';

const NavContainer = styled.div({
  display: 'flex',
  columnGap: '1.5rem',
  fontSize: '0.8rem',
  alignItems: 'center',
  padding: '1.5rem 0 1.5rem 1rem',
  backgroundColor: '#21262e',
});

const Nav = styled.nav({
  display: 'flex',
  columnGap: '1rem',
  fontSize: '1.2rem',
});

const StyledLink = styled(Link)({
  color: '#f5f5f5',
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
});

const Navigation: React.FC = () => {
  return (
    <NavContainer>
      <h1>Project Mangement Tool</h1>
      <Nav>
        <StyledLink to='/'>Dashboard</StyledLink>
        <StyledLink to='#'>Projects</StyledLink>
        <StyledLink to='/projects/new'>Add project</StyledLink>
        <StyledLink to='#'>About</StyledLink>
      </Nav>
    </NavContainer>
  );
};

export default Navigation;
