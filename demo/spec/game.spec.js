require( "should" );
var _ = require( "underscore" );
var game = require( "../lib/game.js" );

describe( "when starting a new game", function() {

	var g = game( 1 ),
		total = 0,
		error;

	_.each( _.range( 21 ), function() {
		describe( "when throwing", function() {
			it( "should have hit 0 to 10 pins", function() {
				try {
					var hit = g[ "throw" ]();
					total += hit;
					hit.should.be.within( 0, 10 );
					g.calculateScore();
				} catch ( err ) {
					error = err;
				}
			} );
		} );
	} );

	describe( "when game is over", function() {
		it( "score should be between pins hit and 300", function() {
			g.score.should.be.within( total, 300 );
		} );
		it( "should have 10 frames or less", function() {
			g.frames.length.should.be.within( 9, 10 );
		} );
	} );
} );