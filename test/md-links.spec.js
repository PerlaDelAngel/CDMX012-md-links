const mdLinks = require('../components/mdLinks');

/* Receives a path
----- 3 possible results ----
1. Promise resolved options false: 
2. Promise resolved options true:
3. Promise rejected
*/

describe('mdLinks', () => {
  it('should resolve to an array with objects about each link found', () => {
    const path = 'C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc2.md';
    const result = [ 
      {href: 'https://developer.mozilla.org/es/',
      text: 'MDN Web Docs, anteriormente Mozilla Developer Netw',
      file: 'C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc2.md',},
      {href: 'https://github.com/PerlaDelAngel/CDMX012-social-network',
      text: 'Social Network Old GH',
      file: 'C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc2.md',},
      {href: 'http://community.laboratoria.la/c/js',
      text: 'foro de la comunidad',
      file: 'C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc2.md',}
    ];

    return mdLinks(path, false).then(data => {
      expect(data).toEqual(result);
    })
  });

  it('should validate links and resolve to an array with objects', () => {
    const path = 'C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc2.md';
    const result = [ 
      {href: 'https://developer.mozilla.org/es/',
      text: 'MDN Web Docs, anteriormente Mozilla Developer Netw',
      file: 'C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc2.md',
      status: 200,
      ok: 'ok'},
      {href: 'https://github.com/PerlaDelAngel/CDMX012-social-network',
      text: 'Social Network Old GH',
      file: 'C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc2.md',
      status: 404,
      ok: 'fail'},
      {href: 'http://community.laboratoria.la/c/js',
      text: 'foro de la comunidad',
      file: 'C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc2.md',
      status: 'Deprecated',
      ok: 'fail'}
    ];

    return mdLinks(path, true).then(data => {
      expect(data).toEqual(result);
    })
  });

  it('should reject the promise', () => {
    return expect(mdLinks('')).rejects.toEqual(Error('Something went wrong'));
  });
});
