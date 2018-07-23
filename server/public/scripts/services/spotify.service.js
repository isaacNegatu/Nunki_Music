musicApp.service('SpotifyService', ['$http', function ($http) {

    const ACCESS_TOKEN = 'BQBWhK8b2yfHJ50sCcW6FxzKRGbwd1MCJBYUPsh9-_vDK95Gg3wV_t55zYXCUoQ_iicFTgBe26N4lN0pde5s8cjDfvqhdRu9j4Go9_XEyGiQgxcTO2nz_Wt9KA7pANwxvoxC8npIRloOrreh';

    const BASE_URL = 'https://api.spotify.com/v1/'

    let self = this;

    self.tracks = {
        list: []
    };

    self.category = {
        list: [],
        tracksInCategory: []
    };

    self.search = function (searchKey) {
        let searchQuery = BASE_URL + `search?q=${searchKey}&type=track&market=US`;
        let request = {
            method: 'GET',
            url: searchQuery,
            headers: {
                'Authorization': 'Bearer ' + ACCESS_TOKEN
            }
        }

        $http(request)
            .then(function (response) {
                self.tracks.list = response.data.tracks.items;
                console.log(self.tracks.list);
            })
            .catch(function (err) {
                console.log(err);
            });
    }


    self.getCatagories = function () {
        let searchQuery = BASE_URL + 'browse/categories?market=US';

        let request = {
            method: 'GET',
            url: searchQuery,
            headers: {
                'Authorization': 'Bearer ' + ACCESS_TOKEN
            }
        }

        $http(request)
            .then(function (response) {
                console.log(response.data.categories.items);

                self.getTracksInCategory(response.data.categories.items[0]);

                self.category.list = response.data.categories.items;
            })
            .catch(function (err) {
                console.log(err);

            })
    }

    self.getCatagories();

    self.getTracksInCategory = function (category) {
        let searchQuery = category.href + '/playlists?market=US';
        console.log(searchQuery);
        

        let request = {
            method: 'GET',
            url: searchQuery,
            headers: {
                'Authorization': 'Bearer ' + ACCESS_TOKEN
            }
        }

        $http(request)
            .then(function (response) {
                console.log(response.data.playlists.items[0].href);

                searchQuery = response.data.playlists.items[0].href + '/tracks?limit=20&market=US';

                console.log(searchQuery);
                
                request = {
                    method: 'GET',
                    url: searchQuery,
                    headers: {
                        'Authorization': 'Bearer ' + ACCESS_TOKEN
                    }
                }

                console.log(request);
                
                
                $http(request)
                    .then(function(response){
                        console.log(response.data.items);
                        
                        self.category.tracksInCategory = response.data.items;
                    })
                    .catch(function(err){
                        console.log(err);
                    })
            })
            .catch(function (err) {
                console.log(err);

            })

    }


    self.getTrack = function(url){
        console.log(url);
        
        let request = {
            method: 'GET',
            url: url,
            headers: {
                'Authorization': 'Bearer ' + ACCESS_TOKEN
            }
        }

        return $http(request)
            .then(function (response) {
                console.log(response.data);
                
                return response.data;
            })
            .catch(function (err) {
                return false;
                console.log(err);
            });
    }


    self.getArtist = function(url){
        console.log(url);
        
        let request = {
            method: 'GET',
            url: url,
            headers: {
                'Authorization': 'Bearer ' + ACCESS_TOKEN
            }
        }

        return $http(request)
            .then(function (response) {
                console.log(response.data);
                
                return response.data;
            })
            .catch(function (err) {
                return false;
                console.log(err);
            });
    }



}]);