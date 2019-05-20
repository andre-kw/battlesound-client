import config from '../config';
import TokenService from '../services/token';

const ContestsService = {
  getContests(userId) {
    const query = userId ? `?user=${userId}` : '';
    
    return fetch(`${config.API_ENDPOINT}/contests${query}`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (! res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
      )
  },

  getContestById(contestId) {
    return fetch(`${config.API_ENDPOINT}/contests/${contestId}`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        return (! res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json();
      })
  }
};

export default ContestsService;