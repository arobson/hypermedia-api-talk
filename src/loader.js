// Load the main reveal.js script
head.js( '/reveal/js/reveal.js', function() {
	// Parse the query string into a key/value object
	var query = {};

	location.search.replace( /[A-Z0-9]+?=(\w*)/gi, function(a) {
		query[ a.split( '=' ).shift() ] = a.split( '=' ).pop();
	} );

	// Fires when a slide with data-state=customevent is activated
	Reveal.addEventListener( 'customevent', function() {
		alert( '"customevent" has fired' );
	} );

	// Fires each time a new slide is activated
	Reveal.addEventListener( 'slidechanged', function( event ) {
		// event.previousSlide, event.currentSlide, event.indexh, event.indexv
	} );

	Reveal.initialize({
		// Display controls in the bottom right corner
		controls: true,

		// Display a presentation progress bar
		progress: true,

		// If true; each slide will be pushed to the browser history
		history: true,

		// Loops the presentation, defaults to false
		loop: false,

		// Flags if mouse wheel navigation should be enabled
		mouseWheel: false,

		// Apply a 3D roll to links on hover
		rollingLinks: false,

		// UI style
		theme: query.theme || 'neon', // default/neon

		// Transition style
		transition: query.transition || 'linear' // default/cube/page/concave/linear(2d)
	});
} );

// Load third party scripts
head.js( '/reveal/lib/js/classList.js' );

// If we're runnning the notes server we need to include some additional JS
// TODO Is there a better way to determine if we're running the notes server?
if( window.location.host === 'localhost:1947' ) {
	head.js( 'plugin/speakernotes/client.js' );
}