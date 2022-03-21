import { lazy, FC } from 'react';
import { Route, RouteProps, Switch } from 'react-router-dom';

export enum routesEnum {
  home = '/',
  stake = '/stake',
  berries = '/berries',
  heavenAndHell = '/heaven-n-hell',
}
const routes: RouteProps[] = [
  {
    path: routesEnum.home,
    exact: true,
    component: lazy(() => import('./Home')),
  },
  {
    path: routesEnum.stake,
    exact: true,
    component: lazy(() => import('./Stake')),
  },
  // {
  //   path: routesEnum.berries,
  //   exact: true,
  //   component: lazy(() => import('./Berries')),
  // },
  {
    path: routesEnum.heavenAndHell,
    exact: true,
    component: lazy(() => import('./HeavenAndHell')),
  },
];

export const Routes: FC = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route path={route.path} key={route.path as string} exact={route.exact} component={route.component} />
      ))}
    </Switch>
  );
};
