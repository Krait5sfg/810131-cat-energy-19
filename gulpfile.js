"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");

//очищает папку build перед копированием
gulp.task("clean", function () {
  return del("build");
});

//копирует нужные файлы в build
gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

//вставляет спрайты во все html файлы, копирует html в build
gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

//делает из icon-*.svg файлов спрайт
gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

//делает из png jpg файлов файлы в формате webp
gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png, jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("source/img"));
})

//оптимизирует все изображения (png, jpg, svg)
gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.mozjpeg({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"))
});

//преобразует scss в минимизированный css
gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber()) //следит за правильным написанием стилей, чтобы не ломалась сборка
    .pipe(sourcemap.init()) //карты кода, чтобы в браузере было видно в каком файле написан какой стиль
    .pipe(sass()) //преобразует scss в css
    .pipe(postcss([
      autoprefixer() //добавляет префиксы
    ]))
    .pipe(csso()) //минимизирует css
    .pipe(rename("style.min.css")) //переименовывает css в style.min.css
    .pipe(sourcemap.write(".")) //Записывает карты кода в тек. папку
    .pipe(gulp.dest("build/css")) //копирует css файл в папку build/css
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  //если произошли изменения в scss запускает задачу css
  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  //если произошли изменения с svg иконками запустить задачу sprite, html, refresh (перегружает сервер)
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  //если произошли изменения в html запустить задачу html и перегрузить сервер
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

//перегружает сервер
gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "html"));
gulp.task("start", gulp.series("build", "server"));
