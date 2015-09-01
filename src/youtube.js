(function() {
	angular.module('zbox-challenge.youtube', [])
	/**
	 * Servicio que se encarga de realizar las búsquedas sobre la API de Youtube
	 */
	.factory('youtubeResource', ['$http', 
		function($http) {
			var _apiKey = 'AIzaSyBhNZXwjch93VAPABxeDLtP-NhtLIQpjlY';
			var _url = 'https://www.googleapis.com/youtube/v3/search';		

			/**
			 * Busca el listado de videos que coindiden con el texto
			 * de búsqueda
			 *
			 * @param 'text' Texto utilizado como filtro de búsqueda
			 * @param 'pageToken' 
			 *
			 * @return 'Promise'
			 */
			function buscar(text, pageToken) {
				var params = {
					part 			: 'snippet',
					maxResults		: 20,
					type			: 'video',
					videoEmbeddable	: 'true',
					q				: text,
					key 			: _apiKey,
					pageToken		: pageToken
				};			

				return $http.get(_url, { params : params });
			}

			return { buscar : buscar };
		}
	]);	
})();
