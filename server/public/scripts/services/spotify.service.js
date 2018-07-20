musicApp.service('SpotifyService', ['$http', function($http){

    const ACCESS_TOKEN = 'BQBqtvZXSaZPsCcoPMq_qolsBJuDGASABrVNrgrilRInWsQuyljxcSUJimcngEhz1wLAgXdoQMX627eqOIf-BhdMuiWAIGHLKxextQCOge_HpqFOVlXE6W8NYGCc3F6cEJqn6ZaVVzHK0Wtm';

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