'use strict';

module.exports = function() {
  $.gulp.task('serve', function() {
    $.browserSync.init({

      proxy: 'http://localhost:3000',   // node.js server показываем на 4000
      port: 4000

//      open: false,
//      server: $.config.root
    });

//    $.browserSync.watch([$.config.root + '/**/*.*', '!**/*.css'], $.browserSync.reload);
  });
};
