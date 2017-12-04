'use strict';

module.exports = function() {
  $.gulp.task('js:svgxuse', function() {
    return $.gulp.src($.path.svgxuse)
    .pipe($.gp.concat('svgxuse.min.js'))
    .pipe($.gulp.dest($.config.root + '/assets/js'))
  })
};