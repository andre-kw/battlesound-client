import config from '../config';

const ContestsService = {
  getContests() {
    return fetch(`${config.API_ENDPOINT}/contests`)
      .then(res =>
        (! res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
      )
  },
};

export default ContestsService;