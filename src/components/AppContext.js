import React, { Component } from 'react';
import TokenService from '../services/token';
import AuthService from '../services/auth';
import ContestsService from '../services/contests';

const AppContext = React.createContext({
  isUserLoggedIn: TokenService.hasAuthToken(),
  user: JSON.parse(window.localStorage.user || '{}'),
  contests: [],
  contest: {},
  submissions: [],
  selectedSubIndex: 0,
  error: null,
  handleLogin: () => {},
  handleLoginSubmit: () => {},
  handleLogout: () => {},
  setLoading: () => {},
  setContest: () => {},
  setSelectedSub: () => {},
  setError: () => {},
  getContests: () => {},
  getContestById: () => {},
});

export default AppContext;


export class AppProvider extends Component {
  state = {
    loading: true,
    user: JSON.parse(window.localStorage.user || '{}'),
    isUserLoggedIn: TokenService.hasAuthToken(),
    contests: [],
    contest: {},
    submissions: [],
    selectedSubIndex: 0,
    error: null,
  }

  handleLogin = (credentials, callback = () => {}) => {
    AuthService.postLogin(credentials)
      .then(json => {
        let user = {id: json.id, username: json.username}
        TokenService.saveAuthToken(json.authToken);
        window.localStorage.user = JSON.stringify(user);

        this.setState({isUserLoggedIn: true, user});
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
    let submissions;

    if(contest.subs) {
      submissions = contest.subs.map(s => {
        s.listened = false;
        return s;
      });
    } else {
      submissions = [];
    }

    this.setState({contest, submissions});
  }

  setContests = (contests) => {
    this.setState({contests});
  }

  setSelectedSub = (index) => {
    const submissions = this.state.submissions;

    if(submissions[index]) {
      submissions[index].listened = true;
    }

    this.setState({selectedSubIndex: index, submissions, error: null});
  }

  setError = (error) => {
    this.setState({error});
  }

  getContests = () => {
    return ContestsService.getContests(this.state.user.id)
      .then(contests => {
        this.setLoading(false);
        this.setContests(contests);
      });
  }

  getContestById = (id) => {
    this.setLoading(true);

    ContestsService.getContestById(id)
      .then(contest => {
        this.setContest(contest);
        this.setLoading(false);

        if(contest.subs) this.setSelectedSub(0);
      })
      .catch(err => {console.log('getContestById Error:', err);});
  }

  render() {
    const value = {
      loading: this.state.loading,
      isUserLoggedIn: this.state.isUserLoggedIn,
      user: this.state.user,
      contests: this.state.contests,
      contest: this.state.contest,
      submissions: this.state.submissions,
      selectedSubIndex: this.state.selectedSubIndex,
      error: this.state.error,
      handleLogin: this.handleLogin,
      handleLoginSubmit: this.handleLoginSubmit,
      handleLogout: this.handleLogout,
      setLoading: this.setLoading,
      setContest: this.setContest,
      setContests: this.setContests,
      setSelectedSub: this.setSelectedSub,
      setError: this.setError,
      getContests: this.getContests,
      getContestById: this.getContestById,
    }

    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}