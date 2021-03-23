// ! THIS FILE IS USED WITH REACT ROUTER HIGHER ORDER COMPONENT TO CREATE DECLARATIVE PROTECTED PAGES

// https://auth0.com/blog/complete-guide-to-react-user-authentication/#Add-User-Authentication

// src/auth/protected-route.js

import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/Loading';

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Loading />,
    })}
    {...args}
  />
);

export default ProtectedRoute;
