gruntFunction = (grunt) ->
  gruntConfig =
    pkg:
      grunt.file.readJSON 'package.json'

    coffee:
      app:
        options:
          join: true

        files:
          "src/app.js": ["coffee/**/*.coffee"]

    watch:
      coffee:
        files: ["coffee/*.coffee"]
        tasks: ["coffee"]

  grunt.initConfig gruntConfig

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['coffee']

  null

module.exports = gruntFunction
