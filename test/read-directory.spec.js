const { exitProcess } = require('yargs');
const readDirec = require('../lib/read-directory');
/*
1. Recibe un path de un directorio y un array vacio (Array1)
2. Lee el directorio y guarda los paths relativos en otro array (ArrayTemp)
3. Recorre el ArrayTemp y por cada elemento resuelve el path y lo vuelve absoluto
SI ES DIRECTORIO
4A. Vuelve a llamar a la función con el path resuelto y el mismo array inicial 
SI TIENE EXTENSION MD
4B. Empuja el path resuelvo al array vacio
5. Retorna el array que debe contener los paths resueltos de todos los archivos md
*/

describe('Recursive function that reads folders to extract markdown files', () => {
  it('Should receive a path to a folder with only files inside and return an array of MD files', () => {
    let mdFiles = [];
    const inputPath = 'C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\second-dir';
    readDirec(inputPath, mdFiles);

    expect(mdFiles).toEqual(['C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\second-dir\\doc4.md'])
  });

  it('Should receive a path to a folder with more folders inside and return only the MD files found', () => {
    let mdFiles = [];
    const inputPath = 'C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\new-dir';
    readDirec(inputPath, mdFiles);

    expect(mdFiles).toEqual(['C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\new-dir\\another-dir\\doc5.md',
    'C:\\Users\\user\\Desktop\\Laboratoria\\ProyectosLab\\CDMX012-md-links\\test-docs\\new-dir\\doc3.md'])
  });
});