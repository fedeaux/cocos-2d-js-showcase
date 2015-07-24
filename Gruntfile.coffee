gruntFunction = (grunt) ->
  gruntConfig =
    pkg:
      grunt.file.readJSON 'package.json'

    coffee:
      app:
        options:
          join: true

        files:
          "src/app.js": ["coffee/config/**/*.coffee", "coffee/core/**/*.coffee", "coffee/**/*.coffee"]

    watch:
      coffee:
        files: ["coffee/**/*.coffee"]
        tasks: ["coffee"]

    concat:
      dist:
        src: [
          'bower_components/underscore/underscore-min.js'
          'bower_components/underscore/stroke-of-genius.js'
        ]

        dest: 'src/vendor.js',

  grunt.initConfig gruntConfig

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-concat'

  grunt.registerTask 'default', ['coffee']

  null

module.exports = gruntFunction
