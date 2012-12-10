var _ = require( "underscore" );

	var find = /[{]([^}]*)[}]/g,
		replace = /[{]replace[}]/g;

module.exports = {
	
	parseRegex: function( regex ) {
		return regex.match( /\/g$/ ) ?
			new RegExp( regex.replace(/\/g$/, "").substring( 1 ), "g" ) :
			new RegExp( regex.substring( 1, regex.length-1 ) );
	},

	replaceTokens: function( url, data ) {
		var self = this,
			tokens = [],
			hasReplacement, match, tokenName;
		while( ( match = find.exec( url ) ) ) {
			tokenName = match[ 1 ];
			tokens.push( tokenName );
		}
		
		if( tokens.length > 0 ) {
			_.each( tokens, function( tokenName ) {
				var replacement = data[ tokenName ],
					stringified, trimmed, replacer;
				if( replacement != undefined ) {
					stringified = ( replace.toString() ).replace( /replace/, tokenName );
					replacer = self.parseRegex( stringified );
					url = url.replace( replacer, replacement );
					console.log( replacement + " - " + replacer );
				}
			} );
		}
		return url;
	}
};