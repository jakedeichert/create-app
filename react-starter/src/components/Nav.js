import { React, styled } from 'utils/component';
import Link from 'components/Link';

const Wrapper = styled.div`
  margin: 0 auto 50px;
  text-align: center;

  a {
    color: #ff670f;
    margin: 0 10px;
  }
`;

const Nav = () => (
  <Wrapper>
    <Link to="/">/home</Link>
    <Link to="/about">/about</Link>
  </Wrapper>
);

export default Nav;
