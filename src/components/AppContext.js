import React, { Component } from 'react';
import TokenService from '../services/token';
import AuthService from '../services/auth';

const AppContext = React.createContext({
  isUserLoggedIn: TokenService.hasAuthToken(),
  userId: 0,
  contest: {},
  submissions: [],
  selectedSubIndex: -1,
  error: '',
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
    userId: 0,
    isUserLoggedIn: TokenService.hasAuthToken(),
    contest: {},
    submissions: [],
    selectedSubIndex: -1,
  }

  handleLoginSubmit = (e, callback) => {
    e.preventDefault();
    this.setLoading(true);
    const { username: un, password: pw } = e.target;

    AuthService.postLogin({
        username: un.value,
        password: pw.value,
      })
      .then(json => {
        un.value = '';
        pw.value = '';

        TokenService.saveAuthToken(json.authToken);
        this.setState({isUserLoggedIn: true, userId: json.id});

        callback();
      })
      .catch(err => {
        this.setState({error: err.error});
      })
  }

  handleLogout = () => {
    TokenService.clearAuthToken();
    this.setState({isUserLoggedIn: false});
  }

  setLoading = (val) => {
    this.setState({loading: val});
  }

  setContest = (contest) => {
    this.setState({contest, submissions: contest.subs || []});
  }

  setSelectedSub = (sub) => {
    if(typeof sub !== 'undefined') {
      const index = this.state.submissions.findIndex(s => s.id === sub.id);
      this.setState({selectedSubIndex: index});
    }
  }

  render() {
    const value = {
      loading: this.state.loading,
      isUserLoggedIn: this.state.isUserLoggedIn,
      userId: this.state.userId,
      contest: this.state.contest,
      submissions: this.state.submissions,
      selectedSubIndex: this.state.selectedSubIndex,
      error: this.state.error,
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