import { React, styled } from 'utils/component';
import ButtonList from './ButtonList';
import Nav from 'components/common/Nav';
import Title from 'components/common/Title';
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
