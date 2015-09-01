var angular = require('../vendor/angular/');

angular.module('zbox-challenge', [])

/**
 * Controlador de la vista principal
 *
 * @author Francisco Riveros
 */
.controller('AppController', ['$scope', 
	function($scope) {
		$scope.videos = [];		
	}
]);