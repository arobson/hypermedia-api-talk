$( function() {
	
	var map = function( list, transform ) {
		var results = [];
		$.each( list, function( index, item ) {
			results.push( transform( item ) );
		} );
		return results;
	};

	var initArrayWith = function( count, content ) {
		var list = new Array( count ),
			i = 0;
		while( count > i++ ) {
			list[ i ] = content;
		}
		return list;
	};

	$( "code" )
		.each( function( index, code ) {
			var originalText = $( code ).text(),
				originalLines = originalText.split( "\n" ),
				fluff = originalLines[1].match( /\s+/ )[0],
				newLines = map( originalLines, function( line ) {
					var newLine = line.replace( fluff, "" ),
						spaceMatch = newLine.match( /^[ ]+/g ),
						spaces = spaceMatch ? spaceMatch[0] : "",
						lead = initArrayWith( spaces.length, "   " ).join("");
					return newLine.replace( spaces, lead );
				} ),
				newText = newLines.join( "\n" );
			$( code ).text( newText );
		} );
} );