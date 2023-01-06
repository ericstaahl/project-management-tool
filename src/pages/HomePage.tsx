import styled from '@emotion/styled';
import React from 'react';

const Container = styled.div({
  borderRadius: '5px',
});

const HomePage: React.FC = () => {
  return (
    <div>
      <Container>
        <h1>HomePage</h1>
      </Container>
    </div>
  );
};

export default HomePage;
