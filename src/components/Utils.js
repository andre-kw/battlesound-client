import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import TokenService from '../services/token';

export function Loader(props) {
  return (
    <div className="loader">
      <img src="/img/knight.gif" alt="loading knight" className="knight-loader"></img>
      <p>Loading...</p>
    </div>
  );
}

export function Breadcrumb(props) {
  return (
    <div className="breadcrumb">
      {!props.onHomePage ? <Link to="/home">Home</Link> : ''}
      {props.children}
    </div>
  );
}

export function PrivateRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => (
        TokenService.hasAuthToken()
          ? <Component {...componentProps} />
          : <Redirect
              to={{
                pathname: '/login',
                state: { from: componentProps.location }
              }}
            />
      )}
    />
  )
}

export function PublicOnlyRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => (
        TokenService.hasAuthToken()
          ? <Redirect to={'/'} />
          : <Component {...componentProps} />
      )}
    />
  )
}