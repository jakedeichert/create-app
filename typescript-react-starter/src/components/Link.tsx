import * as React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

const ExternalLink: React.SFC<ExternalLinkProps> = ({ to, children }) => (
  <a href={to} rel="noopener">
    {children}
  </a>
);
interface ExternalLinkProps {
  to: string;
}

const Link: React.SFC<LinkProps> = ({ to, ext, children }) => {
  if (ext) return <ExternalLink to={ext}>{children}</ExternalLink>;
  return <ReactRouterLink to={to || ''}>{children}</ReactRouterLink>;
};
interface LinkProps {
  to?: string;
  ext?: string;
}

export default Link;
