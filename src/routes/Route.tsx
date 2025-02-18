import React from 'react';
import { Route } from 'react-router-dom';
import DefaultLayout from '../pages/_layout/DefaultLayout';

export interface IRouteWrapper {
  isPrivate?: boolean;
  component: any;
  path: string;
  exact?: any;
}

const RouteWrapper: React.FC<IRouteWrapper> = ({
  component: Component,
  path,
  exact,
  ...rest
}) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Route
      {...rest}
      path={path}
      exact={exact}
      render={props => (
        <DefaultLayout>
          <Component {...props} />
        </DefaultLayout>
      )}
    />
  );
};

export default RouteWrapper;
