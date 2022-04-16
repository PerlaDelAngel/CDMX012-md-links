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
      //console.log(finalObj);
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
        //console.log(finalObj);
        return finalObj;
      }
    });
}

module.exports = {validateLink}