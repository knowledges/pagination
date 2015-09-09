module.exports = function(grunt) {

  // Project configuration.
grunt.initConfig({
	
// Project configuration.
pkg: grunt.file.readJSON('package.json'),
uglify: {
    options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    },
    build: {
        src: 'src/*.js',
        dest: 'build/js/<%= pkg.name %>-<%=pkg.version%>.min.js'
    }
},

// jshint:{
//     build:['Gruntfile.js','src/*.js'],
//     options:{
//         jshintrc:'.jshintrc'
//     }
// },

watch: {
    build: {
        files: ['src/*'],
        tasks: ['jshint', 'uglify'],
        options: {
            spawn: false
        }
    }
}
	
});
  
  // ���ذ��� "uglify" ����Ĳ����
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Ĭ�ϱ�ִ�е������б�
  grunt.registerTask('default', ['uglify','watch']);//'jshint',

};