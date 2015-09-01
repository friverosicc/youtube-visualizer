(function() {		
	var angular = require('angular');
	require('angular-material');
	require('./youtube');

	angular.module('zbox-challenge', [
		'ngMaterial',
		'zbox-challenge.youtube'
	])
	.config(function($sceDelegateProvider) {
		$sceDelegateProvider.resourceUrlWhitelist([
			// Allow same origin resource loads.
			'self',
			// Allow loading from our assets domain.  Notice the difference between * and **.
			'http://www.youtube.com/**'
		]);
	})

	/**
	 * Controlador de la vista principal
	 *
	 * @author Francisco Riveros
	 */
	.controller('AppController', [
		'$scope', 
		'$location',
		'$anchorScroll',
		'youtubeResource',
		function($scope, $location, $anchorScroll, youtubeResource) {
			$scope.mostrarReproductor = false;
			$scope.videos = [];
			$scope.video = { url : '' };
			$scope.mostrarBotonSiguiente = false;

			var _url = 'http://www.youtube.com/embed/';
			var _buscandoMas = false;

			/**
			 * Busca el listado de videos que coinciden con el 
			 * texto del filtro.
			 */
			$scope.buscarVideos = function() {
				$scope.mostrarReproductor = false;
				$scope.video.url = '';

				youtubeResource.buscar($scope.filtro.text, $scope.filtro.nextPageToken)
				.then(function(response) {
					if(_buscandoMas) {
						$scope.videos = $scope.videos.concat(response.data.items);							
					} else {
						$scope.videos = response.data.items;	
					}
					
					$scope.filtro.nextPageToken = response.data.nextPageToken;
					$scope.mostrarBotonSiguiente = true;
					_buscandoMas = false;
				});
			};

			/**
			 * Busca los siguientes videos que conciden con el
			 * texto de búsqueda.
			 */
			$scope.siguientePagina = function() {
				_buscandoMas = true;	
				$scope.buscarVideos();			
			};

			/**
			 * Comienza a reproducir el video seleccionado
			 *
			 * @param 'videoId' Código identificador del video
			 */
			$scope.reproducir = function(videoId) {	
				$scope.video.url = _url + videoId + '?autoplay=1';			
				$scope.mostrarReproductor = true;
				$location.hash('player-container');
				$anchorScroll();
			};
		}
	]);

})();