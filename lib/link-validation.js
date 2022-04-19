const axios = require('axios').default;

function validateLink(linkObj){
  return axios.get(linkObj.href)
  .then((response => {
    if(response.status >= 200 && response.status < 400){
      const finalObj = {
        ...linkObj, 
        'status' : response.status,
        'ok' : 'ok',
      }
      return finalObj;
    }
    }))
    .catch(err => {
      if(err.response){
        const finalObj = {
          ...linkObj, 
          'status' : err.response.status,
          'ok' : 'fail',
        }
        return finalObj;
      } else {
        const finalObj = {
          ...linkObj, 
          'status' : 'Bad request',
          'ok' : 'fail',
        }
        return finalObj;
      }
    });
}

module.exports = validateLink;