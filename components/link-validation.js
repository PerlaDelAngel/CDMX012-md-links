const axios = require('axios').default;

function validateLink(linkObj){
  return axios.get(linkObj.href)
  .then((response => {
    const finalObj = {
      ...linkObj, 
      'status' : response.status,
      'ok' : 'ok',
     }
    return finalObj;
    }
  ))
  .catch(err => {
    if (err.response) {
      const finalObj = {
        ...linkObj,
        'status': err.response.status,
        'ok': 'fail',
      }
      return finalObj;
    } else {
      const finalObj = {
        ...linkObj,
        'status': `Error ${err.message}`,
        'ok': 'fail',
      }
      return finalObj;
    }
  });
}

module.exports = validateLink;