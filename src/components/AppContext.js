import React, { Component } from 'react';
import TokenService from '../services/token';
import AuthService from '../services/auth';

const AppContext = React.createContext({
  isUserLoggedIn: TokenService.hasAuthToken(),
  contest: {},
  submissions: [],
  selectedSubIndex: -1,
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
    isUserLoggedIn: TokenService.hasAuthToken(),
    contest: {},
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

  setLoading = (val) => {
    this.setState({loading: val});
  }

  setContest = (contest) => {
    let submissions = contest.subs;
    this.setState({contest, submissions});
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
      contest: this.state.contest,
      submissions: this.state.submissions,
      selectedSubIndex: this.state.selectedSubIndex,
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