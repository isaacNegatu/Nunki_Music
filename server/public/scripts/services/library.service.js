musicApp.service('LibraryService', ['$http', function ($http) {

    let self = this;

    self.playLists = {
        list: []
    };

    self.tracks = {
        list: []
    };

    self.artists = {
        list: []
    };


    self.getPlaylists = function () {

        $http.get('/music/playlist')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    self.addTrack = function (track) {
        

        let trackInfo = {
            title : track.name,
            image_url : track.album.images[0].url,
            api_url : track.href
        }

        let artistName = track.artists[0].name;

        let artistExists = self.artists.list.find(function(artist){
            return artist.name == artistName;
        })

        if(!artistExists){
            self.addArtist(track)
            .getArtists()
            .then(function () {
                console.log('==========================');
                console.log();
                
                let artist = self.artists.list.find(function(art){
                    return art.name = artistName;
                });

                let artistId = artist.id;

                console.log(artistId);
                
                let data = {
                    track : trackInfo,
                    artistId : artistId
                }
                
                $http.post('/music/track', data)
                    .then(function (trackResponse) {
                        console.log(trackResponse);
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            })
            .catch(function (err) {
                console.log(err);
            });
        }else{
            let artist = self.artists.list.find(function(art){
                return art.name = artistName;
            });

            let artistId = artist.id;

            console.log(artistId);
            
            let data = {
                track : trackInfo,
                artistId : artistId
            }
            
            $http.post('/music/track', data)
                .then(function (trackResponse) {
                    console.log(trackResponse);
                })
                .catch(function (err) {
                    console.log(err);
                })
        }
            




    }

    self.addArtist = function (track) {
        let currentArtistInfo = {
            name: track.artists[0].name,
            api_url: track.artists[0].href
        };

        return $http.post('/music/artist', currentArtistInfo)
            .then(function (response) {
                
                return response.data;
            })
            .catch(function (err) {
                console.log(err);
                return false;
            })
    }


    self.getArtists = function(){
        return $http.get('/music/artist')
            .then(function(response){
                return self.artists.list =  response.data;
            })
            .catch(function(err){
                return false;
                console.log(err);
            })
    }


}]);