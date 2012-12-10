define( [ 'app/views/main-view' ], 
	function( View ) {
		return {
			init: function() {
				this.view = new View();
				this.view.render();
			}
		};
	} );