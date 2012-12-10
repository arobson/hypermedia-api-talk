define( [ "jquery", "underscore" ], 
	function( $, _ ) {

		var game = {
			data: {},
			api: {},
			links: {},

			buildCall: function( link ) {
				var self = this;
				return function( success, failure ) {
					$.ajax( {
						url: link.href,
						type: link.method.toUpperCase(),
						dataType: "json",
						success: function( data ) {
							self.parseLinks( data, link.rel === "options" ? "api" : "links" );
							self.mapData( data );
							if( success ) {
								success( data );
							}
						},
						failure: failure
					} );
				};
			},
			init: function( done ) {
				this.api.options = this.buildCall( { rel: "options", method: "OPTIONS", href: "/game/" } );
				this.api.options( done );
			},
			mapData: function( data ) {
				var self = this,
					current = data.game;
				if( current ) {
					_.each( current, function( value, key ) {
						self.data[ key ] = current[ key ];
					} );
				}
			},
			parseLinks: function( data, target ) {
				var self = this;
				self[ target ] = {};
				if( data.links ) {
					_.each( data.links, function( link ) {
						self[ target ][ link.rel ] = self.buildCall( link );
					} );
				}
			}
		};

		_.bindAll( game );
		return game;
	} );