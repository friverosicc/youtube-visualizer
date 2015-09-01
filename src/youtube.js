(function(){
	angular.module('zbox-challenge.youtube', [])
	.factory('youtubeResource', ['$http', 
		function($http) {
			var _apiKey = 'AIzaSyBhNZXwjch93VAPABxeDLtP-NhtLIQpjlY';
			var _url = 'https://www.googleapis.com/youtube/v3/search';		

			function buscar(text, pageToken) {
				var params = {
					part 			: 'snippet',
					maxResults		: 20,
					videoEmbeddable : 'true'
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
