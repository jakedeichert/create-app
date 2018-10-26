import { Link as ReactRouterLink } from 'react-router-dom';
import { React, pt } from 'utils/component';

const ExternalLink = ({ to, children }) => (
  <a href={to} rel="noopener noreferrer">
    {children}
  </a>
);

ExternalLink.propTypes = {
  to: pt.string,
};

const Link = ({ to, children }) => {
  if (to.startsWith('http')) {
    return <ExternalLink to={to}>{children}</ExternalLink>;
  }
  return <ReactRouterLink to={to}>{children}</ReactRouterLink>;
};

Link.propTypes = {
  to: pt.string,
};

export default Link;
