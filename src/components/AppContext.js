import React, { Component } from 'react';
import TokenService from '../services/token';

const AppContext = React.createContext({
  submissions: [],
  selectedSubIndex: -1,
  setUserLoggedIn: () => {},
  setSubmissions: () => {},
  setSelectedSub: () => {},
});

export default AppContext;


export class AppProvider extends Component {
  state = {
    submissions: [],
    selectedSubIndex: -1,
  }

  setSubmissions = (submissions) => {
    this.setState({submissions});
  }

  setSelectedSub = (id) => {
    const index = this.state.submissions.findIndex(s => s.id === id);
    this.setState({selectedSubIndex: index});
  }

  render() {
    const value = {
      isLoggedIn: TokenService.hasAuthToken(),
      submissions: this.state.submissions,
      selectedSubIndex: this.state.selectedSubIndex,
      setUserLoggedIn: this.setUserLoggedIn,
      setSubmissions: this.setSubmissions,
      setSelectedSub: this.setSelectedSub,
    }

    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}