import { React, styled } from 'utils/component';

const H1 = styled.h1`
  color: #80f;
`;

const Title = ({ children }) => <H1>{children}</H1>;

export default Title;
