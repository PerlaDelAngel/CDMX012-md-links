const getLinks = require('../components/get-links');

describe('Obtains information for each link found in the given path', () => {
  it('should return an array with objects for each link', () => {
    const paths = ['C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc2.md'];
    const linksObject = getLinks(paths);
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
    
    expect(linksObject).toEqual(result);
  });
});