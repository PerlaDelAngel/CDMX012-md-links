const validateLink = require('../components/link-validation');
const axios = require ('axios');
/*Function returns a promise 
Receives an object with an .href property 
makes an http request with it and returns an object with href, text, file, status, and ok properties
------ 3 posible cases ------
1. successful response
2. fail: response.status that is >=300
3. fail: unreachable/deprecated link
*/
jest.mock('axios');

describe('Makes a HTTP request for a link', () => {
  it('should return an object for a successful HTTP request', () => {
    const linkObj = {
      href: 'https://developer.mozilla.org/es/',
      text: 'MDN Web Docs, anteriormente Mozilla Developer Netw',
      file: 'C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc2.md',
    };
    const result = {
      href: 'https://developer.mozilla.org/es/',
      text: 'MDN Web Docs, anteriormente Mozilla Developer Netw',
      file: 'C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc2.md',
      status: 200,
      ok: 'ok',
    };
    axios.get.mockResolvedValue(result);
    
    return validateLink(linkObj).then(data => {
      expect(data).toEqual(result);
      expect(axios.get).toHaveBeenCalledWith('https://developer.mozilla.org/es/');
    });
  });

  it('should return an object for a failed HTTP request', () => {
    const linkObj = {
      href: 'https://github.com/PerlaDelAngel/CDMX012-social-network',
      text: 'Social Network Old GH',
      file: 'C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc2.md',
    };
    const result = {
      href: 'https://github.com/PerlaDelAngel/CDMX012-social-network',
      text: 'Social Network Old GH',
      file: 'C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc2.md',
      status: 404,
      ok: 'fail',
    };
    axios.get.mockRejectedValue({response : {status : 404}});

    return validateLink(linkObj).then(data => {
      expect(data).toEqual(result);
      expect(axios.get).toHaveBeenCalledWith('https://github.com/PerlaDelAngel/CDMX012-social-network');
    });
  });

  it('should return an object for a deprecated link', () => {
    const linkObj = {
      href: 'http://community.laboratoria.la/c/js',
      text: 'foro de la comunidad',
      file: 'C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc2.md',
    };
    const result = {
      href: 'http://community.laboratoria.la/c/js',
      text: 'foro de la comunidad',
      file: 'C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc2.md',
      status: 'Error undefined',
      ok: 'fail',
    };
    axios.get.mockRejectedValue(result);
    
    return validateLink(linkObj).then(data => {
      expect(data).toEqual(result);
      expect(axios.get).toHaveBeenCalledWith('http://community.laboratoria.la/c/js');
    });
  });
 });