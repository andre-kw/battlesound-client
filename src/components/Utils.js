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

export function EyeCandyBanner(props) {
  return (
    <div id="s-top" className={props.contestId ? undefined : 'hide'}>
      <span>{'CAUTION: Entering battle field. '.repeat(15)}</span>
    </div>
  );
}

export function EyeCandyMeter(props) {
  let jsx = [];

  for(let i = 0; i < 8; i++) {
    let classColor;

    if(i >= 5) {
      classColor = 'red';
    } else if(i <= 1) {
      classColor = 'green';
    } else {
      classColor = 'yellow';
    }

    jsx.push(
      <div className="rack-meter-row">
        <div className={`rack-led led-${classColor} ${props.litness > i ? 'led-on' : ''}`}></div>
        <div className={`rack-led led-${classColor} ${props.litness > i ? 'led-on' : ''}`}></div>
      </div>
    )
  }

  return <div className="rack-meter">{jsx}</div>;
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