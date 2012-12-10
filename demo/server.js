var express = require( "express" );
var _ = require( "underscore" );
var path = require( "path" );
var gameMetadata = require( "./lib/gameMetadata.js" );
var gameManager = require( "./lib/gameManager.js" );
var urlTemplate = require( "./lib/urlTemplate.js" );

var mapMetadata = function( metadata ) {
	var entities = {};
	_.each( metadata, function( entity, entityName ) {
		var entityOptions = entityName + "-option";
		entities[ entityName ] = { links: {} };
		entities[ entityOptions ] = { links: {} };
		_.each( entity, function( action, actionName ) {
			var link = {
				rel: actionName,
				href: "/" + entityName + ( action.instance ? "/{id}" : "/" ),
				method: action.method
			};
			entities[ entityName ].links[ actionName ] = link;
			if( !action.instance ) {
				entities[ entityOptions ].links[ actionName ] = link;
			}
		} );
	} );
	return entities;
};

var filterLinks = function( links, entity, action, state ) {
	return _.filter( links, function( link ) {
				var exists = _.any( action.transitions || [], function( t ) {
						return t === link.rel;
					} ),
					available = exists ? entity[ link.rel ].available : undefined,
					valid = available ? available( state ) : true;
				return exists && valid;
			} );
};

var fillTemplates = function( links, state ) {
	return _.map( links, function( link ) {
				link = _.clone( link );
				link.href = urlTemplate.replaceTokens( link.href, state );
				return link;
			} );
};

var mapRoutes = function( app, metadata ) {
	var linkMap = mapMetadata( metadata );
	_.each( metadata, function( entity, entityName ) {
		_.each( entity, function( action, actionName ) {
			var url = "/" + entityName +
					( action.instance ? "/:id" : "/" ),
				list = linkMap[ entityName ].links;

			app[ action.method ]( url, function( req, resp ) {
				var call = gameManager[ actionName ],
					state = req.params.id != undefined ? call( req.params.id ) : call(),
					stateMap = _.pick( state, action.properties ),
					links = filterLinks( list, entity, action, state );

				resp.send( {
					game: stateMap,
					links: fillTemplates( links, stateMap )
				} );
			} );
		} );
		app.options( "/" + entityName, function( req, resp ) {
			resp.send( linkMap[ entityName + "-option" ] );
		} );
	} );
};

( function() {
	var app = express();
	mapRoutes( app, gameMetadata );

	app.use( "/", express["static"]( path.resolve( "./html" ) ) );
	app.use( "/js/", express["static"]( path.resolve( "./js" ) ) );
	app.use( "/css/", express["static"]( path.resolve( "./css" ) ) );
	app.use( "/images/", express["static"]( path.resolve( "./images" ) ) );

	app.listen( 3000 );
	console.log( "Bowling API server listening on 3000" );
} )();