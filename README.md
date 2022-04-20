# mdLinks

## Contents

* [1. Highlights](#1-highlights)
* [2. About the project](#2-about-the-project)
* [3. Installation](#3-installation)
* [4. Usage](#4-usage)
* [5. API](#5-api)

***

## 1. Highlights

* Promise based library. 
* Recursively reads any folders inside the given path. 
* Link extraction supported by the use of RegExp.
* Delivers basic and complete stats about the links found. 

## 2. About the project

The mdLinks library provides the user with an efficient solution to extract the links inside the markdown files found in a given path. This tool can work with files or directories, being able to recursively read any folders found inside of the provided directory until it founds all the markdown files it contains. 

The user can provide a couple of different options to obtain two kinds of information about the links found: 
* `--validate` or `-v`: Will make an HTTP request for each link and return the obtained status.
* `--stats` or `-s`; 

This project has the following dependencies:
* [Yargs](https://www.npmjs.com/package/yargs)
* [Chalk](https://github.com/chalk/chalk)
* [Axios](https://github.com/axios/axios)

Library tested using [Jest](https://jestjs.io/). 

<!-- primero el diagrama de flujo
guia de instalacion
datos curiosos
licencia y asi 
npm install ruta -->

## 3. Installation

## 4. Usage

## 5. API