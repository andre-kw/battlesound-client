import React, { Component } from 'react';
import TokenService from '../services/token';
import AuthService from '../services/auth';

const AppContext = React.createContext({
  isUserLoggedIn: TokenService.hasAuthToken(),
  user: JSON.parse(window.localStorage.user || '{}'),
  contest: {},
  submissions: [],
  selectedSubIndex: -1,
  error: '',
  handleLogin: () => {},
  handleLoginSubmit: () => {},
  handleLogout: () => {},
  setLoading: () => {},
  setContest: () => {},
  setSelectedSub: () => {},
});

export default AppContext;


export class AppProvider extends Component {
  state = {
    loading: true,
    user: JSON.parse(window.localStorage.user || '{}'),
    isUserLoggedIn: TokenService.hasAuthToken(),
    contest: {},
    submissions: [],
    selectedSubIndex: -1,
  }

  handleLogin = (credentials, callback = () => {}) => {
    AuthService.postLogin(credentials)
      .then(json => {
        TokenService.saveAuthToken(json.authToken);
        window.localStorage.user = JSON.stringify({id: json.id});
        this.setState({isUserLoggedIn: true});

        callback();
      })
      .catch(err => {
        this.setLoading(false);
        this.setState({error: err.error});
      });
  }

  handleLoginSubmit = (e, callback) => {
    e.preventDefault();
    this.setLoading(true);
    const { username: un, password: pw } = e.target;

    this.handleLogin({username: un.value, password: pw.value}, callback);

    un.value = '';
    pw.value = '';
  }

  handleLogout = () => {
    TokenService.clearAuthToken();
    window.localStorage.removeItem('user');
    this.setState({isUserLoggedIn: false});
  }

  setLoading = (val) => {
    this.setState({loading: val});
  }

  setContest = (contest) => {
    this.setState({contest, submissions: contest.subs || []});
  }

  setSelectedSub = (index) => {
    this.setState({selectedSubIndex: index});
  }

  render() {
    const value = {
      loading: this.state.loading,
      isUserLoggedIn: this.state.isUserLoggedIn,
      user: this.state.user,
      contest: this.state.contest,
      submissions: this.state.submissions,
      selectedSubIndex: this.state.selectedSubIndex,
      error: this.state.error,
      handleLogin: this.handleLogin,
      handleLoginSubmit: this.handleLoginSubmit,
      handleLogout: this.handleLogout,
      setLoading: this.setLoading,
      setContest: this.setContest,
      setSelectedSub: this.setSelectedSub,
    }

    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}