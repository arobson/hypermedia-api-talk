$( function() {
	$( "code" ).each( function( index, el ) {
		var id = "editor-" + index;
		el.id = id;
		var editor = ace.edit( id );
		editor.setTheme("ace/theme/textmate");
		editor.session.setMode("ace/mode/javascript");
		editor.setFontSize( "22px" );
		editor.resize();
	} );
} );