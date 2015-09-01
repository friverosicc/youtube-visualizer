var angular = require('../vendor/angular/');
require('./youtube');

angular.module('zbox-challenge', ['zbox-challenge.youtube'])

/**
 * Controlador de la vista principal
 *
 * @author Francisco Riveros
 */
.controller('AppController', ['$scope', 'youtubeResource',
	function($scope, youtubeResource) {
		$scope.videos = [];

		/**
		 * Busca el listado de videos que coinciden con el 
		 * texto del filtro.
		 */
		$scope.buscarVideos = function() {
			youtubeResource.buscar($scope.filtro.text)
			.then(function(response) {
				$scope.videos = response.data.items;
				$scope.filtro.nextPageToken = response.data.nextPageToken;

				console.log($scope.filtro);
			});
		};
	}
]);