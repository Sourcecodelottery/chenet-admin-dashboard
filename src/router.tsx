import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';
import customRoutes from "./constants/routes"

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import myRoutes from './my.routes';

const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Pages

const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Admin
const BrokerHomePage = Loader(lazy(() => import('src/pages/Broker')))
const BrokerProfile = Loader(lazy(() => import('src/pages/Broker/profile/')))
const DriverHomePage = Loader(lazy(() => import('src/pages/Driver')))
const CreateDriverHomePage = Loader(lazy(() => import('src/pages/Driver/CreateDriver/')))
const CombinationUserHomePage = Loader(lazy(() => import('src/pages/CombinationUser')))
const CompanyHomePage = Loader(lazy(() => import('src/pages/Company')))
const NewsHomePage = Loader(lazy(() => import('src/pages/News/')))
const CreateNews = Loader(lazy(() => import('src/pages/News/CreateNews/')))
const NotificationHomePage = Loader(lazy(() => import('src/pages/Notification/')))
const CreateNotification = Loader(lazy(() => import('src/pages/Notification/CreateNotification/')))
const SettingsPage = Loader(lazy(() => import('src/pages/Settings/')))

// Survey
const SurveyHomePage = Loader(lazy(() => import('src/survey/Homepage/')))
const CreateSurvey = Loader(lazy(() => import('src/survey/CreateSurvey/')))
const CreateSurveyContents = Loader(lazy(() => import('src/survey/CreateSurveyContents/')))
const SingleSurvey = Loader(lazy(() => import('src/survey/SingleSurvey/')))
const SingleSurveyContents = Loader(lazy(() => import('src/survey/SingleSurveyContents/')))
const FillSurvey = Loader(lazy(() => import('src/survey/FillSurvey/')))
const ThankYouPage = Loader(lazy(() => import('src/survey/ThankYouPage/')))

// Applications

const Messenger = Loader(lazy(() => import('src/content/applications/Messenger')));
const Transactions = Loader(lazy(() => import('src/content/applications/Transactions')));
const UserProfile = Loader(lazy(() => import('src/content/applications/Users/profile')));
const UserSettings = Loader(lazy(() => import('src/content/applications/Users/settings')));

// Components

const Buttons = Loader(lazy(() => import('src/content/pages/Components/Buttons')));
const Modals = Loader(lazy(() => import('src/content/pages/Components/Modals')));
const Accordions = Loader(lazy(() => import('src/content/pages/Components/Accordions')));
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges = Loader(lazy(() => import('src/content/pages/Components/Badges')));
const Tooltips = Loader(lazy(() => import('src/content/pages/Components/Tooltips')));
const Avatars = Loader(lazy(() => import('src/content/pages/Components/Avatars')));
const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));


// Status

const Status404 = Loader(lazy(() => import('src/content/pages/Status/Status404')));
const Status500 = Loader(lazy(() => import('src/content/pages/Status/Status500')));
const StatusComingSoon = Loader(lazy(() => import('src/content/pages/Status/ComingSoon')));
const StatusMaintenance = Loader(lazy(() => import('src/content/pages/Status/Maintenance')));
const Login = Loader(lazy(() => import('src/content/pages/Status/Login/')))
const Category = Loader(lazy(() => import('src/content/pages/Category')));


const routes: PartialRouteObject[] = [
  {
    path: '*',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: <BrokerHomePage />
      },
      {
        path: 'overview',
        element: (
          <Navigate
            to="/"
            replace
          />
        )
      },
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: (
              <Navigate
                to="404"
                replace
              />
            )
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          },
          {
            path: customRoutes.STATUS.THANK_YOU_PAGE.__PATH,
            element: <ThankYouPage />
          },
        ]
      },
      {
        path: '*',
        element: <Status404 />
      },
    ]
  },
  {
    path: 'dashboards',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="/dashboards/crypto"
            replace
          />
        )
      },
      {
        path: 'crypto',
        element: <Crypto />
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },
  {
    path: customRoutes.ADMIN.__PATH,
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: customRoutes.ADMIN.BROKER.__PATH,
        element: <BrokerHomePage />
      },
      {
        path: customRoutes.ADMIN.BROKER_PROFILE.__PATH,
        element: <BrokerProfile />
      },
      {
        path: customRoutes.ADMIN.DRIVER.__PATH,
        element: <DriverHomePage />
      },
      {
        path: customRoutes.ADMIN.CREATE_DRIVER.__PATH,
        element: <CreateDriverHomePage />
      },
      {
        path: customRoutes.ADMIN.COMBINATION_USER.__PATH,
        element: <CombinationUserHomePage />
      },
      {
        path: customRoutes.ADMIN.COMPANY.__PATH,
        element: <CompanyHomePage />
      },
      {
        path: customRoutes.ADMIN.NEWS.__PATH,
        element: <NewsHomePage />
      },
      {
        path: customRoutes.ADMIN.CREATE_NEWS.__PATH,
        element: <CreateNews />
      },
      {
        path: customRoutes.ADMIN.NOTIFICATION.__PATH,
        element: <NotificationHomePage />
      },
      {
        path: customRoutes.ADMIN.CREATE_NOTIFICATION.__PATH,
        element: <CreateNotification />
      },
      {
        path: customRoutes.ADMIN.SETTINGS.__PATH,
        element: <SettingsPage />
      },
    ]
  },
  {
    path: customRoutes.SURVEY.__PATH,
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: customRoutes.SURVEY.HOMEPAGE.__PATH,
        element: <SurveyHomePage />
      },
      {
        path: customRoutes.SURVEY.CREATE_SURVEY.__PATH,
        element: <CreateSurvey />
      },
      {
        path: customRoutes.SURVEY.CREATE_SURVE_CONTENTS.__PATH,
        element: <CreateSurveyContents />
      },
      {
        path: customRoutes.SURVEY.SINGLE_SURVEY.__PATH,
        element: <SingleSurvey />
      },
      {
        path: customRoutes.SURVEY.SINGLE_SURVEY_CONTENTS.__PATH,
        element: <SingleSurveyContents />
      },
      {
        path: customRoutes.SURVEY.FILL_SURVEY.__PATH,
        element: <FillSurvey />
      },
    ]
  },
  {
    path: 'management',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="/management/transactions"
            replace
          />
        )
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'profile',
        children: [
          {
            path: '/',
            element: (
              <Navigate
                to="details"
                replace
              />
            )
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          },
        ]
      }
    ]
  },
  {
    path: 'components',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="/components/buttons"
            replace
          />
        )
      },
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      },
    ]
  }
];

export default routes;
