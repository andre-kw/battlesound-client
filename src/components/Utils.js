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
  let status;

  switch(props.status) {
    case 0: status = <em className="text-fail">cancelled</em>; break;
    case 1: status = <em className="text-success">ongoing</em>; break;
    case 3: status = <em className="text-warning">ended</em>; break;
    default: status = <em className="text-muted">n/a</em>; break;
  }
  
  return (
    <div className="breadcrumb">
      {!props.onHomePage ? <Link to="/home"><i className="fas fa-home icon"></i> Home</Link> : ''}
      {props.children}
      {!props.hideStatus ? <span className="breadcrumb-status">Status: {status}</span> : ''}
    </div>
  );
}

export function Alert(props) {
  return (
    <div className={`alert alert-${props.type}`}><div><i className="fas fa-exclamation"></i></div> {props.children}<div></div></div>
  );
}

export function EyeCandySpeakers() {
  return <>
    <div id="s-left"></div>
    <div id="s-right"></div>
  </>;
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