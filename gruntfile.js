const { option } = require('grunt');

module.exports = function(grunt){
    const sass = require('sass');


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        sass:{
            development:{
                options:{
                    implementation: sass,
                    outputStyle:'expanded'
                },
                files: [{
                    expand: true,
                    cwd: 'src/style',
                    src: ['**/*.scss'], 
                    dest: 'dev/style', 
                    ext: '.css' 
                }]
            },
            production:{
                options:{
                    implementation: sass,
                    outputStyle: 'compressed',
                },
                files:[{
                    expand: true,
                    cwd: 'src/style',
                    src: ['**/*.scss'],
                    dest: 'dist/style',
                    ext: '.css'
                }]
            }
        },
        uglify:{
            production:{
                files:[{
                    expand: true,
                    cwd: 'src/scripts',
                    src:['**/*.js'],
                    dest: 'dist/script',
                    ext: '.min.js'
                }]
            }
        },
        watch:{
            styles:{
                files:['src/style/**/*.scss'],
                tasks:['sass:development'],
                options:{
                    spawn:false,
                }
            }
        }
    })
    grunt.loadNpmTasks('grunt-sass')
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.registerTask('default',['sass:development','watch'])
    grunt.registerTask('build', ['sass:production', 'uglify:production'])
}