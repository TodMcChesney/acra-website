# AlabamaCupRaces.com
This is the source code for the Alabama Cup Racing Association website. All of
the responsive features are coded in CSS, no JavaScript was used.

## Getting Started
To get this project up and running for development and testing you will need to
get Gulp setup.

### Requires
- Node.js v4
- Ruby
- Sass >= v3.4

### Install
From the command line in the root project folder run:

```$ npm install```

This will install Gulp locally with all the necessary modules. I do not like to
install Gulp globally, so I use npm scripts to run my Gulp tasks instead.

### Running Dev Environment

```$ npm run gulp```

This task compiles the Sass to CSS with source maps, auto-prefixes the CSS,
spins up a localhost server, and watches for changes to all files in the 'src'
folder. BrowserSync automatically opens the index.html page and refreshes the
site after any changes are saved.

### Building Production Code

```$ npm run gulp-build```

This task deletes the contents of the 'dist' folder, minifies the CSS and HTML,
and copies all production files to the clean 'dist' folder.

## License
This repository is not licensed.

Alabama Cup Racing Association © 2017 All Rights Reserved
