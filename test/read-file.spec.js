const pathIsFile = require('../components/read-file');

describe('Identifies markdown files', () => {
  it('should receive a path to a file that is not markdown', () => {
    let mdFiles = [];
    const absolutePath = 'C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\second-dir\\testdoc2.txt';
    const consoleSpy = jest.spyOn(console, 'log');

    pathIsFile(absolutePath, mdFiles);

    expect(consoleSpy).toHaveBeenCalledWith('This is not a markdown file and cannot be analyzed');
  });

  it('should receive a path to a .md file and store it in an array', () => {
    let mdFiles = [];
    const absolutePath = 'C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc2.md';

    pathIsFile(absolutePath, mdFiles);
    
    expect(mdFiles).toEqual(['C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc2.md']);
  });

  it('should receive a path to a .markdown file and store it in an array', () => {
    let mdFiles = [];
    const absolutePath = 'C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc6.markdown';

    pathIsFile(absolutePath, mdFiles);
    
    expect(mdFiles).toEqual(['C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\doc6.markdown']);
  });
});

