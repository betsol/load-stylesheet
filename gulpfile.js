
//==============//
// DEPENDENCIES //
//==============//

// Local dependencies.
const pkg = require('./package.json');

// Node dependencies.
const fs = require('fs');

// Third-party dependencies.
const del = require('del');
const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const header = require('gulp-header');
const serverFactory = require('spa-server');


//=========//
// GLOBALS //
//=========//


//=======//
// CLEAN //
//=======//

gulp.task('clean', () => del('dist'));


//=======//
// BUILD //
//=======//

gulp.task('build', ['clean'], () => {
  const headerContent = fs.readFileSync('src/header.js', 'utf8');
  return gulp
    .src([
      './src/module.js'
    ])
    .pipe(concat('betsol-load-stylesheet.js'))
    .pipe(header(headerContent, { pkg : pkg } ))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(header(headerContent, { pkg : pkg } ))
    .pipe(rename('betsol-load-stylesheet.min.js'))
    .pipe(gulp.dest('dist'))
    .on('error', gutil.log)
  ;
});


//======//
// DEMO //
//======//

gulp.task('demo', () => {
  const server = serverFactory.create({
    path: './demo',
    port: 1337
  });
  server.start();
});


//==============//
// DEFAULT TASK //
//==============//

gulp.task('default', ['build']);
