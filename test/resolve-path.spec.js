const resolvePath = require('../components/resolve-path');

describe('Returns an absolute path', () => {
  it('should receive a relative path and turn it into an absolute one', () => {
    const path = resolvePath('./test-docs/doc2.md')
    expect(path).toBe('C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc2.md');
  });
  it('should receive an absolute path and return it as is', () => {
    const path = resolvePath('C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc2.md')
    expect(path).toBe('C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc2.md');
  });
});