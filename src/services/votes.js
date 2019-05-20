import config from '../config';
import TokenService from '../services/token';

const VotesService = {
  castVote(contestId, body) {
    return fetch(`${config.API_ENDPOINT}/votes/${contestId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
  },
};

export default VotesService;