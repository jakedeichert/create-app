import { React, styled } from 'utils/component';
import Nav from 'components/common/Nav';
import Title from 'components/common/Title';
import Link from 'components/ui/Link';

const Wrapper = styled.div`
  padding: 50px 50px 0;
  margin: 0 auto;
  text-align: center;
`;

const Paragraph = styled.p`
  margin: 0 auto;
  max-width: 500px;
  a {
    color: #00d162;
    margin: 0 10px;
  }
`;

const AboutPage = () => (
  <Wrapper>
    <Title>About</Title>
    <Nav />
    <Paragraph>
      My web app starter kit with: react, react-router, redux, immer,
      styled-components and webpack
    </Paragraph>
    <br />
    <Paragraph>
      Check it out here:
      <br />
      <Link to="https://github.com/jakedeichert/create-app/tree/master/react-starter">
        https://github.com/jakedeichert/create-app/tree/master/react-starter
      </Link>
    </Paragraph>
  </Wrapper>
);

export default AboutPage;
