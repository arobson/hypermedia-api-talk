var _ = require( "underscore" );
var game = require( "./game.js" );

var gameManager = {
	games: {},
	ids: _.range( 1024 ),
	score: function( id ) {
		var g = this.games[ id ];
		if( g ) {
			g.calculateScore();
			return g;
		} else {
			throw new Error( "invalid game id: " + id );
		}
	},
	start: function() {
		var id = this.ids.shift(),
			g = game( id );
		this.games[ id ] = g;
		return g;
	},
	stop: function( id ) {
		var g = this.games[ id ];
		if( g ) {
			delete this.games[ id ];
			return g;
		} else {
			throw new Error( "invalid game id: " + id );
		}
	},
	"throw": function( id ) {
		var g = this.games[ id ];
		if( g ) {
			var hit = g[ "throw" ]();
			return g;
		} else {
			throw new Error( "invalid game id: " + id );
		}
	}
};

_.bindAll( gameManager );

module.exports = gameManager;