const getStats = require('../lib/stats');

/* getStats.stats 
RECEIVES: Array with objects, each object has href property
RETURNS: An array with unique links */

describe('Removes repeated links', () => {
  it('should return an array with unique links', () => {
    const links = [
      {href : 'https://developer.mozilla.org/es/'},
      {href : 'http://community.laboratoria.la/c/js'},
      {href : 'http://community.laboratoria.la/c/js'},
      {href : 'https://developer.mozilla.org/es/'},
      {href : 'https://developer.mozilla.org/es/'}, 
      {href : 'https://nodejs.org/api/path.html'},
    ];
    const uniqueLinks = getStats.stats(links);
    const result = ['https://developer.mozilla.org/es/', 'http://community.laboratoria.la/c/js', 'https://nodejs.org/api/path.html'];

    expect(uniqueLinks).toEqual(result);
  });
})

/* getStats.brokenLinks 
RECEIVES: Array with objects, each object has href property
RETURNS: A promise that resolves into a number */

describe('Validates links and returns the ammount of broken ones', () => {
  it('should return a number', () => {
    const links = [
      {href : 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175'},
      {href : 'http://community.laboratoria.la/c/js'},
      {href : 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions'},
      {href : 'https://developer.mozilla.org/es/'}, 
      {href : 'https://nodejs.org/api/path.html'},
    ];

    return getStats.brokenLinks(links).then(data => {
      expect(data).toBe(3);
    });
  });
})