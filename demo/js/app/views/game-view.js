define( [ "backbone", 'underscore', 'jquery', 'text!/js/app/templates/game.html', "app/models/game" ],
	function( Backbone, _, $, template, game ) {

		var Game = Backbone.View.extend( {
			el: "#game",
			template: function() {},
			events: {
				"click .action": "actionHandler"
			},

			actionHandler: function( e ) {
				var self = this,
					$el = $( e.currentTarget ),
					actionName = $el.attr( "data-id" ),
					sourceName = $el.attr( "data-source" );

				game[ sourceName ][ actionName ]( function() {
					self.render();
				} );
			},
			initialize: function() {
				var self = this;
				this.template = _.template( template );
				game.init( function() {
					self.render();
				} );
			},
			render: function() {
				var html = this.template( game );
				this.$el.html( html );
			}
		} );

		return Game;
	} );