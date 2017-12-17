'use strict';

module.exports = function() {
  $.gulp.task('js:copygmap', function() {
    return $.gulp.src($.path.copygmap)
    .pipe($.gp.concat('init.google.map.js'))
    .pipe($.gulp.dest($.config.root + '/assets/js'))
  })
};