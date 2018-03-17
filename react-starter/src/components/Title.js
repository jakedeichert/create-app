import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  color: #80f;
`;

const Title = ({ children }) => <H1>{children}</H1>;

export default Title;
