module.exports = function(grunt) { 

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		concat: {
			options: {
				seperator: ";", 
				stripBanners: true,
				banner: '/*! <%=pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("dd-mm-yyyy") %> */'
			}, 
			// concatonates the bboxx js files that are used for the application
			ttest_js: {
				src: ['app/app.js'],
				dest: 'assets/js/wip/<%= pkg.name %>Main_<%= pkg.version %>.js',
			},
			// concatonates all the node_module js files. 
			node_files: {
				src: ['node_modules/jquery/dist/jquery.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/angular/angular.min.js', 'node_modules/angular-messages/angular-messages.min.js', 'node_modules/angular-ui-router/release/angular-ui-router.min.js', 'node_modules/angular-bootstrap-npm/dist/angular-bootstrap.min.js', 'node_modules/angular-bootstrap-npm/dist/angular-bootstrap-tpls.min.js', 'node_modules/angular-ui-grid/ui-grid.min.js', 'node_modules/bootbox/bootbox.min.js', 'node_modules/angular-ui-grid/ui-grid.min.js', 'node_modules/raven-js/dist/raven.js', 'node_modules/raven-js/dist/plugins/angular.js'], 
				dest: 'assets/js/wip/<%= pkg.name %>NodeFiles.js' 
			},
			// smooshes together the css files. 
			css : {
				src: ['node_modules/bootstrap/dist/css/bootstrap.min.css', 'node_modules/font-awesome/css/font-awesome.min.css' , 'node_modules/angular-ui-grid/ui-grid.min.css', 'assets/css/wip/cornerstone.css' ], 
				dest: 'assets/css/compiled/nNc_<%= pkg.version %>.css', 
			},
			loading_css: { 
				src: 'assets/css/wip/loading.css', 
				dest: 'assets/css/compiled/loading_<%= pkg.version %>.css',
			},
		}, 
		// minifies the concatonated js files 
		uglify: {
			options: {
				manage: false, 
				preserveComments: false
			},
			js_node: {
				 src: 'assets/js/wip/<%= pkg.name %>NodeFiles.js',
				dest: 'assets/js/dist/<%= pkg.name %>.min.js',
			},
		}, 
		// minifies the concatonated css files 
		cssmin: {
			options: {
		  },
			compress: {
	      src: 'assets/css/compiled/nNc_<%= pkg.version %>.css',
	      dest: 'assets/css/dist/<%= pkg.name %>_<%= pkg.version %>.css'
			},
			loading_css : {
				src: 'assets/css/compiled/loading_<%= pkg.version %>.css', 
				dest: 'assets/css/dist/loading.min.css',
			},
		},
		// Looks for changes in the files and makes sure the minified files are updated. 
		watch: {
			js_css_concat: {
				files: ['<%= concat.ttest_js.src %>', '<%= concat.node_files.src %>', '<%= concat.css.src %>', '<%= concat.loading_css.src %>' ],
				tasks: ["concat"],
			},
			js_uglify: {
				files: ['<%= uglify.js_node.src %>'],
				tasks: ["uglify"],
			}, 
			css_min: {
				files: ['<%= cssmin.compress.src %>', '<%= cssmin.loading_css.src %>'],
				tasks: ["cssmin"],
			},
		},

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Watch is started by default when 'grunt' is used
	grunt.registerTask('default', ['watch']);

	//to manually do the task, type 'grunt manual'
	grunt.registerTask('manual', ['concat', 'uglify', 'cssmin']);

}; 