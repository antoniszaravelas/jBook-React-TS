# jBook-React-TS

## Description

My motivation to build this jBook project was my curiosity about how other web apps like Codepen or CodesandBox work and at the same time I wanted to depeen my knowledge on Technologies such as 

* React + Typescript
* Code Transpilation (ESBUILD,  Webpack)
* IFrames
* Caching using IndexedDB
* React + Redux + Typescript
* Dynamic Design Patterns etc.

This app is similar to how CodePen works (a more simplified version). How it works: 

- Click any text cell to edit it
- The code in each code editor is all joined together into 1 file. If you define a cariable for example in Cell #1, you can refer to it in any following cell 
- You can show any React component, string, number or anything else by calling the show function (built function for this environment). Call show multiple times to show multiple values.
- Add new cells (either a new code or a text editor) by hovering on the divider between each cell  

All of the changes are saved to the file you opened JBook with So if you have run **npx jbook serve test.js**, all of the text and code you write will be saved to the ***test.js*** file.

## Installation

To get the application running simply clone the repository

```bash
https://github.com/antoniszaravelas/jBook-React-TS.git
```


and

```bash
npm jsnote serve
```

After that you will be asked to navigate to http://localhost:4005 to start working around the file 

## Dependencies

* cors
* express
* http-proxy-middleware

and many others as **devDevependencies** (have a look at my package.json file).

## License
[MIT](https://choosealicense.com/licenses/mit/) jBook
