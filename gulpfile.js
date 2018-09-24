'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const gulpif = require('gulp-if');
const prefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rigger = require('gulp-rigger');
const cssmin = require('gulp-minify-css');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const rimraf = require('rimraf');
const browserSync = require("browser-sync");
const reload = browserSync.reload;

const { NODE_ENV } = process.env;

const path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/'
  },
  src: {
    html: 'src/*.html',
    js: 'src/js/main.js',
    style: 'src/style/main.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/style/**/*.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  clean: './build'
};

const config = {
  server: {
    baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 8000,
  logPrefix: "Frontend_Devil"
};

gulp.task('html:build', function () {
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
  gulp.src(path.src.js) //Найдем наш main файл
    .pipe(rigger()) //Прогоним через rigger
    .pipe(sourcemaps.init()) //Инициализируем sourcemap
    .pipe(gulpif(NODE_ENV !== 'development', uglify() )  )
    .pipe(sourcemaps.write()) //Пропишем карты
    .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
    .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('style:build', function () {
  gulp.src(path.src.style) //Выберем наш main.scss
    .pipe(sourcemaps.init()) //То же самое что и с js
    .pipe(sass()) //Скомпилируем
    .pipe(prefixer()) //Добавим вендорные префиксы
    .pipe(cssmin()) //Сожмем
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css)) //И в build
    .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
  gulp.src(path.src.img) //Выберем наши картинки
    .pipe(imagemin({ //Сожмем их
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img)) //И бросим в build
    .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
  'html:build',
  'js:build',
  'style:build',
  'fonts:build',
  'image:build'
]);

gulp.task('watch', function(){
  watch([path.watch.html], (event, cb) => {
    gulp.start('html:build');
  });
  watch([path.watch.style], (event, cb) => {
    gulp.start('style:build');
  });
  watch([path.watch.js], (event, cb) => {
    gulp.start('js:build');
  });
  watch([path.watch.img], (event, cb) => {
    gulp.start('image:build');
  });
  watch([path.watch.fonts], (event, cb) => {
    gulp.start('fonts:build');
  });
});

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
