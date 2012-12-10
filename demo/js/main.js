requirejs.config( {
	baseUrl: 'js/lib',
	paths: { app: '../app' }
} );

require( [ 'underscore', 'jquery', 'backbone' ], function() {
	require( [ 'app/bowling' ], function( bowling ) {
		window.bowling = bowling;
		bowling.init();
	} );
} );