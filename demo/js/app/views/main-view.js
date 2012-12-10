define( [ 'backbone', 'underscore', 'jquery', 'text!/js/app/templates/main.html', 'app/views/game-view' ], 
	function ( Backbone, _, $, template, GameView ) {
		var View = Backbone.View.extend( {
			el: $( "body" ),
			template: function() {},

			initialize: function() {
				this.template = _.template( template );
			},
			render: function() {
				this.$el.html( this.template() );
				this.gameView = new GameView();
				this.gameView.render();
			}
		} );

		return View;
	} );