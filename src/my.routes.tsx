import { Suspense, lazy } from 'react';
import { PartialRouteObject } from 'react-router';

import SidebarLayout from 'src/my/layouts/SidebarLayout';
import BaseLayout from 'src/my/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import Account from './my/content/pages/Account';
import CreateAccount from './my/content/pages/Account/CreateAccount';
import { EditAccount } from './my/content/pages/Account/EditAccount';
import Notification from './my/content/pages/Notification';
import CreateNotification from './my/content/pages/Notification/CreateNotification';
import { EditNotification } from './my/content/pages/Notification/EditNotification';
import News from './my/content/pages/News';
import CreateNews from './my/content/pages/News/CreateNews';
import { EditNews } from './my/content/pages/News/EditNews';

const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);


// Status

const Status404 = Loader(lazy(() => import('src/content/pages/Status/Status404')));
const Login = Loader(lazy(() => import('src/my/content/pages/Auth/Login/')))
// const Category = Loader(lazy(() => import('src/my/content/pages/Category/')));
// const Price = Loader(lazy(() => import('src/my/content/pages/Price/')));
const UserProfile = Loader(lazy(() => import('src/my/content/pages/Account/Profile/')));


const myRoutes: PartialRouteObject[] = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: (
          <SidebarLayout />
        ),
        children: [
          {
            path: "accounts",
            element: <Account />
          },
          {
            path: "accounts/create",
            element: <CreateAccount />
          },
          {
            path: "accounts/:id",
            element: <EditAccount />
          },
          {
            path: "accounts/profile",
            element: <UserProfile />
          },
          {
            path: "news",
            element: <News />
          },
          {
            path: "news/create",
            element: <CreateNews />
          },
          {
            path: "news/:id",
            element: <EditNews />
          },
          {
            path: "notifications",
            element: <Notification />
          },
          {
            path: "notifications/create",
            element: <CreateNotification />
          },
          {
            path: "notifications/:id",
            element: <EditNotification />
          }
        ]
      },
      {
        path: '/',
        children: [
          {
            path: 'login',
            element: <Login />
          },
        ]
      },
      {
        path: '*',
        element: <Status404 />
      },
    ]
  },
];

export default myRoutes;
