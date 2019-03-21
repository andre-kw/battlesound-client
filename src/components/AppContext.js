import React, { Component } from 'react';

const AppContext = React.createContext({
  isLoggedIn: false,
  setUserLoggedIn: () => {},
});

export default AppContext;


export class AppProvider extends Component {
  state = {
    isLoggedIn: false,
  }

  setUserLoggedIn = (status) => {
    this.setState({isLoggedIn: status});
  }

  render() {
    const value = {
      isLoggedIn: this.state.isLoggedIn,
      setUserLoggedIn: this.setUserLoggedIn,
    }

    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}