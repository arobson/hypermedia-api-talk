var _ = require( "underscore" );

var gameFactory = function( id ) {

	var remainingThrows = function( pins, frameIndex, frame ) {
		var throwCount = frame.throws.length;
		if( frameIndex < 9 ) {
			if( throwCount < 2 && pins > 0 ) {
				return 2 - throwCount;
			} else {
				return 0;
			}
		} else {
			if( pins === 0 && throwCount < 3 ) {
				return 3 - throwCount;
			} else {
				return 2 - throwCount;
			}
		}
	};

	var getNextThrow = function( throwIndex, forwardBy, frameIndex, frames ) {
		var throws = frames[ frameIndex ].throws;
		if( throwIndex + forwardBy < throws.length ) {
			return frames[ frameIndex ].throws[ throwIndex + forwardBy ];
		} else if( frameIndex + 1 < frames.length ) {
			throws = frames[ frameIndex + 1 ].throws;
			var index = forwardBy > 1 ? 1 : 0;
			return throws.length > forwardBy ? throws[ index ] : 0;
		} else {
			return 0;
		}
	};

	var getNextThrows = function( throwIndex, frameIndex, frames ) {
		var first = getNextThrow( throwIndex, 1, frameIndex, frames ),
			second = getNextThrow( throwIndex, 2, frameIndex, frames );
		return first + second;
	};

	var scoreFrame = function( frameIndex, frame, frames ) {
		var throws = frame.throws,
			throw1 = throw2 = throw3 = sum = 0;
		switch( throws.length ) {
			case 0:
				return 0;
			case 1:
				throw1 = throws[ 0 ];
				if( throw1 === 10 ) {
					return 10 + getNextThrows( 0, frameIndex, frames );
				} else {
					return throw1;
				}
				break;
			case 2:
				throw1 = throws[ 0 ];
				throw2 = throws[ 1 ];
				sum = throw1 + throw2;
				if( sum === 10 ) {
					return 10 + getNextThrow( 1, 1, frameIndex, frames );
				} else {
					return sum;
				}
				break;
			case 3:
				throw1 = throws[ 0 ];
				throw2 = throws[ 1 ];
				throw3 = throws[ 2 ];
				sum1 = throw1 + throw2;
				var total = 0;
				if( sum === 10 ) {
					return throw3 + throw1 + throw2 + getNextThrow( 1, 1, frameIndex, frames );
				} else if( throw1 === 10 ) {
					total = 10 + getNextThrows( 0, frameIndex, frames );
				} else if( throw1 + throw2 < 10 ) {
					return throw3 + throw2 + throw1;
				}
				if( throw2 === 10 ) {
					total = total + 10 + getNextThrows( 1, frameIndex, frames );	
				} 
				return total + throw3;
		}
	};

	var getScore = function( frames ) {
		var total = 0;
		_.each( frames, function( frame, index ) {
			total += scoreFrame( index, frame, frames );
		} );
		return total;
	};

	var game = {
		id: id,
		frame: 0,
		frames: [],
		score: 0,
		pins: 10,
		done: false,
		"calculateScore": function() {
			this.score = getScore( this.frames );
		},
		"throw": function() {
			var currentFrame = this.frames[ this.frame ];
			if( !currentFrame ) {
				currentFrame = { throws: [] };
				this.frames[ this.frame ] = currentFrame;
			}
			var throws = remainingThrows( this.pins, this.frame, currentFrame );
			
			if( throws === 0 ) {
				if( this.frame === 9 ) {
					return 0;
				} else {
					this.pins = 10;
					this.frame ++;
					currentFrame = { throws: [] };
					this.frames[ this.frame ] = currentFrame;
				}
			} else if( this.frame === 9 && this.pins === 0 ) {
				this.pins = 10;
			}

			if( throws === 1 && this.frame === 9 ) {
				this.done = true;
			}

			var hit = Math.round( ( Math.random() * 100 ) % this.pins );
			currentFrame.throws.push( hit );
			this.pins -= hit;
			return hit;
		}
	};

	return game;
};

module.exports = gameFactory;