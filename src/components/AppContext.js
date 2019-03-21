import React, { Component } from 'react';
import TokenService from '../services/token';
import AuthService from '../services/auth';

const AppContext = React.createContext({
  isUserLoggedIn: false,
  submissions: [],
  selectedSubIndex: -1,
  handleLoginSubmit: () => {},
  handleLogout: () => {},
  setSubmissions: () => {},
  setSelectedSub: () => {},
});

export default AppContext;


export class AppProvider extends Component {
  state = {
    isUserLoggedIn: false,
    submissions: [],
    selectedSubIndex: -1,
  }

  handleLoginSubmit = (e, callback) => {
    e.preventDefault();
    const { username: un, password: pw } = e.target;

    AuthService.postLogin({
        username: un.value,
        password: pw.value,
      })
      .then(res => {
        un.value = '';
        pw.value = '';

        TokenService.saveAuthToken(res.authToken);
        this.setState({isUserLoggedIn: true});
        callback();
      })
      .catch(res => {
        this.setState({error: res.error});
      })
  }

  handleLogout = () => {
    TokenService.clearAuthToken();
    this.setState({isUserLoggedIn: false});
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
      isUserLoggedIn: this.state.isUserLoggedIn,
      submissions: this.state.submissions,
      selectedSubIndex: this.state.selectedSubIndex,
      handleLoginSubmit: this.handleLoginSubmit,
      handleLogout: this.handleLogout,
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