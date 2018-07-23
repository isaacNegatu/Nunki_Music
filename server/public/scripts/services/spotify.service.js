musicApp.service('SpotifyService', ['$http', function ($http) {

    const ACCESS_TOKEN = 'BQCrq_0GQSITWwvl1oZWfwmzePwP2audDvbfy5VDvGTEqF4kLZ3LC0k3VpNyhhQhSelX8dWAaVleICGD84BFZQT-XaKSHRV2D2JvHQeZVTlyOnoJfUHtETe_KQgutn0ReJxL7a0M2ux8hj32';

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



}]);