import { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface ScrollToTopProps {
  children: JSX.Element;
  location: {
    pathname: string;
  };
}

const ScrollToTop: FunctionComponent<
  ScrollToTopProps & RouteComponentProps
> = ({ children, location: { pathname } }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return children || null;
};

export default withRouter(ScrollToTop);
