import styled from '@emotion/styled';
import React from 'react';

const Nav = styled.nav({
  display: 'flex',
  textDecoration: 'none',
  rowGap: '1rem',
});

const Navigation: React.FC = () => {
  return (
    <div>
      <Nav>
        <a href='/'>Dashboard</a>
        <a href='#'>Projects</a>
        <a href='#'>About</a>
      </Nav>
    </div>
  );
};

export default Navigation;
