module.exports = function(grunt) {
    grunt.initConfig({
        svgstore: {
          options: {
            prefix : 'icon-', // This will prefix each ID
            svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
              viewBox : '0 0 64 64',
              xmlns: 'http://www.w3.org/2000/svg'
            },
          },
          your_target: {
            files: {
                'src/Theme/svg-defs.svg': ['./icons-svg/*.svg'],
              },
            // Target-specific file lists and/or options go here.
          },
        },
      });
      grunt.loadNpmTasks('grunt-svgstore');
      grunt.registerTask('default', ['svgstore']);
}
