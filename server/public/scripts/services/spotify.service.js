musicApp.service('SpotifyService', ['$http', function($http){

    const ACCESS_TOKEN = 'BQCd17NF2SjXxU1gpnUihHkhNkOjk6Bzb-R3uoAFznHzPdCuC0zsoD4-E12J9DiWGB2GT0z9LX3PHgt4rS7uo6S2SO1NMyX34ZVui4yxgfPLXOTlO1QyDDblukSfog4Jfj67jNMSUR24vAGV';

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