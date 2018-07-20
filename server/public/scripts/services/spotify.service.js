musicApp.service('SpotifyService', ['$http', function($http){

    const ACCESS_TOKEN = 'BQDRg_t6c5GBjnRcTD6wNv1gDaxVEodZL4EVVPzkO1E-AC7OTyZQdXJqM5SroG8BftTse0YaQkZxa9e12f8TjLAwrM-4Ep9t0rkiuAePRSw9h8K5dVr0I14HlELQlE3usx7E7OmovHMScMqp';

    const BASE_URL = 'https://api.spotify.com/v1/'

    let self = this;

    self.tracks = { list: [] };

    self.search = function(searchKey){
        let seachQuery = BASE_URL + `search?q=${searchKey}&type=track&market=US`;
        let request = {
            method : 'GET',
            url : seachQuery,
            headers : {
                'Authorization': 'Bearer ' + ACCESS_TOKEN
            }
        }

        $http(request)
            .then(function(response){
                self.tracks.list = response.data.tracks.items;
                console.log(self.tracks.list);
                
            })
            .catch(function(err){
                console.log(err);
                
            });
    }



}]);