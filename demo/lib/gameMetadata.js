module.exports = {
	"game": {
		"throw": {
			"method": "put",
			"instance": true,
			"properties": [
				"id",
				"pins"
			],
			"transitions": [
				"stop", "score", "throw"
			],
			"available": function( state ) {
				return !state.done;
			}
		},
		"stop": { 
			"method": "delete",
			"instance": true,
			"properties": [
				"id",
				"frames",
				"score"
			]
		},
		"score": { 
			"method": "get",
			"instance": true,
			"properties": [
				"id",
				"frames",
				"pins",
				"score"
			],
			"transitions": [
				"stop", "score", "throw"
			] 
		},
		"start": { 
			"method": "post", 
			"properties": [
				"id",
				"frames"
			],
			"transitions": [
				"stop", "score", "throw"
			]
		}
	}
};