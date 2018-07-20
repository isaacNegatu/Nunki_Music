musicApp.service('SpotifyService', ['$http', function($http){

    const ACCESS_TOKEN = 'BQB81F2IHcujRbqu01CbQejOzEo6OtwXBf0-zc4CSxnrOwGv5h05bMTOR98syWHyOP11djuJe-7Tt5EvifYPCZoBJoIXTw4rsYsh73CrK9tR5K1dh785-O5mxLlHB3ouUOmwnixWlgcy70Y4';

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