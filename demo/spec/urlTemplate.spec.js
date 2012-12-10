require( "should" );
var urlTemplate = require( "../lib/urlTemplate.js" );
var _ = require( "underscore" );

describe( "when replacing existing token", function() {

	var url = "test/{id}";
	var data = {
		id: 1
	};

	it( "should replace token", function() {
		urlTemplate.replaceTokens( url, data ).should.equal( "test/1" );
	} );

} );

describe( "when replacing missing token", function() {

	var url = "/test/{id}";
	var data = {};

	it( "should replace token", function() {
		urlTemplate.replaceTokens( url, data ).should.equal( "/test/{id}" );
	} );

} );

describe( "when replacing without tokens", function() {

	var url = "/test";
	var data = { id: 10 };

	it( "should replace token", function() {
		urlTemplate.replaceTokens( url, data ).should.equal( "/test" );
	} );

} );