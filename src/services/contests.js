import config from '../config';
import TokenService from '../services/token';

const ContestsService = {
  getContests() {
    return fetch(`${config.API_ENDPOINT}/contests`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (! res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
      )
  },
};

export default ContestsService;