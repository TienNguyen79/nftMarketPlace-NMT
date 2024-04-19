import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { IndexedObject } from 'types/common';
import SuspenseFallback from '../components/Common/SuspenseFallback/SuspenseFallback';
import Layout, { PropsLayout } from '../components/Layout/Layout';
import { Epath } from './routesConfig';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { getTokenFromLocalStorage, getVariablesLC } from 'app/helpers/localStorage';
import { setAuthenticated } from 'store/auth/authSlice';

export type RoutesProps = {
  exact?: boolean;
  path: string;
  component: React.FC<{ history: IndexedObject; location: IndexedObject; match: IndexedObject }>;
  auth?: boolean;
  routes?: Array<RoutesProps>;
  layout?: React.FC<PropsLayout>;
};
const RenderRoutes = ({
  routes,
  isAuthenticated,
}: {
  routes: Array<RoutesProps>;
  isAuthenticated: boolean;
}) => {
  isAuthenticated = useSelector((state: RootState) => state.authSlice.isAuthenticated);

  return (
    // <Suspense fallback={<SuspenseFallback />}>
    <Switch>
      {routes.map((route, i) => {
        const LayoutRoute = route.layout || Fragment;
        const Component = route.component || <div />;

        if (route.auth && !isAuthenticated) {
          return <Redirect key={i} to={Epath.loginPage} />;
        }

        return (
          <Route
            key={i}
            path={route.path}
            exact={!!route.exact}
            render={(props) => {
              return (
                <LayoutRoute>
                  {route.routes ? (
                    <RenderRoutes routes={route.routes} isAuthenticated={isAuthenticated} />
                  ) : (
                    <Component {...props} />
                  )}
                </LayoutRoute>
              );
            }}
          />
        );
      })}
    </Switch>
    // </Suspense>
  );
};

export const routes = [
  // các cái ngoài này không theo layout
  {
    exact: true,
    path: Epath.notFoundPage,
    component: lazy(() => import('../pages/NotFoundPage/NotFoundPage')),
  },
  // theo layout
  {
    path: '*',
    layout: Layout,
    component: () => <Redirect to={Epath.homePage} />,
    routes: [
      {
        exact: true,
        path: Epath.homePage,
        component: lazy(() => import('../pages/HomePage/HomePage')),
        auth: false,
      },
      {
        exact: true,
        path: Epath.signUpPage,
        component: lazy(() => import('../pages/AuthPage/SignUpPage/SignUpPage')),
        auth: false,
      },
      {
        exact: true,
        path: Epath.loginPage,
        component: lazy(() => import('../pages/AuthPage/LoginPage/LoginPage')),
        auth: false,
      },
      {
        exact: true,
        path: Epath.artistPage,
        component: lazy(() => import('../pages/ArtistPage/ArtistPage')),
        auth: false,
      },
      {
        exact: true,
        path: Epath.nftPage,
        component: lazy(() => import('../pages/NftPage/NftPage')),
        auth: false,
      },
      {
        exact: true,
        path: Epath.marketplacePage,
        component: lazy(() => import('../pages/MarketPlacePage/MarketPlace')),
        auth: false,
      },
      {
        exact: true,
        path: Epath.rankingPage,
        component: lazy(() => import('../pages/RankingPage/RankingPage')),
        auth: false,
      },
      {
        exact: true,
        path: Epath.collection,
        component: lazy(() => import('../pages/CollectionPage/CollectionPage')),
        auth: false,
      },
      {
        exact: true,
        path: Epath.userUpdatePage,
        component: lazy(() => import('../pages/UserUpdatePage/UserUpdatePage')),
        auth: true,
      },
      {
        exact: true,
        path: Epath.createNft,
        component: lazy(() => import('../pages/NftPage/CreateNftPage/CreateNftPage')),
        auth: true,
      },
      {
        exact: true,
        path: Epath.myNfts,
        component: lazy(() => import('../pages/MyNftsPage/MyNftsPage')),
        auth: true,
      },
      {
        exact: true,
        path: Epath.updateNft,
        component: lazy(() => import('../pages/NftPage/UpdateNftPage/UpdateNftPage')),
        auth: true,
      },
      {
        exact: true,
        path: Epath.giveNft,
        component: lazy(() => import('../pages/GiveNftPage/GiveNftPage')),
        auth: true,
      },
      {
        exact: true,
        path: Epath.buyNft,
        component: lazy(() => import('../pages/BuyNftPage/BuyNftPage')),
        auth: true,
      },

      {
        exact: true,
        path: '*',
        component: () => <Redirect to={Epath.notFoundPage} />,
      },
    ],
  },
];

export default RenderRoutes;
