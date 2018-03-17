import React from 'react';
import styled from 'styled-components';
import ButtonList from 'components/ButtonList';
import Nav from 'components/Nav';
import Title from 'components/Title';
import * as constants from 'constants/app';

const Wrapper = styled.div`
  padding: 50px 50px 0;
  margin: 0 auto;
  text-align: center;
`;

const Version = styled.p`
  font-family: Monaco, monospace;
  font-size: 12px;
`;

const HomePage = () => (
  <Wrapper>
    <Title>React Starter</Title>
    <Nav />
    <ButtonList />
    <Version>v{constants.version}</Version>
  </Wrapper>
);

export default HomePage;
