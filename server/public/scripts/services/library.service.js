musicApp.service('LibraryService', ['$http', function ($http) {

    let self = this;

    self.playlists = {
        list: []
    };

    self.tracks = {
        list: []
    };

    self.artists = {
        list: []
    };


    self.currentPlaylist = {
        list: []
    }


    self.getPlaylists = function () {

        $http.get('/music/playlist')
            .then(function (response) {

                self.playlists.list = response.data;

            })
            .catch(function (err) {
                console.log(err);
            })
    }

    self.createPlaylist = function (playlist) {
        let playlistObject = {
            name: playlist
        }
        $http.post('/music/playlist', playlistObject)
            .then(function (response) {
                console.log(response);
                self.getPlaylists();
            })
            .catch(function (err) {
                console.log(err);

            })
    }

    self.getPlaylists();

    self.addTrack = function (track) {


        let trackInfo = {
            title: track.name,
            image_url: track.album.images[0].url,
            api_url: track.href
        }

        let artistName = track.artists[0].name;

        return self.addArtist(track)
            .then(function (response) {

                let artistId = response[0].id;
                let data = {
                    track: trackInfo,
                    artistId: artistId
                }

                $http.post('/music/track', data)
                    .then(function (trackResponse) {
                        self.getTracks();
                        return true;
                        console.log(trackResponse);
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            }).catch(function (err) {
                console.log(err);
                return false;
            });
    }

    self.getTracks = function () {
        $http.get('/music/track')
            .then(function (response) {


                self.tracks.list = response.data;
                console.log(self.tracks.list);

            })
            .catch(function (err) {
                console.log(err);

            })
    }
    self.getTracks();

    self.deleteTrack = function (track) {

        $http.delete(`/music/track/${track.id}`)
            .then(function (response) {
                console.log(response);
                self.getTracks();
            })
            .catch(function (err) {
                console.log(err);

            });
    }

    self.addArtist = function (track) {
        let currentArtistInfo = {
            name: track.artists[0].name,
            api_url: track.artists[0].href
        };

        return $http.post('/music/artist', currentArtistInfo)
            .then(function (response) {
                console.log(response);
                return response.data.rows;
            })
            .catch(function (err) {
                console.log(err);
                return false;
            })
    }


    self.getArtists = function () {
        return $http.get('/music/artist')
            .then(function (response) {
                return self.artists.list = response.data;
            })
            .catch(function (err) {
                return false;
                console.log(err);
            })
    }

    self.addToPlaylist = function (track, playlistId) {


        if (track.album) {
            self.getTrackId(track)
                .then(function (getTResponse) {
                    console.log(getTResponse);
                    
                    if (getTResponse.length == 0) {
                        self.addTrack(track)
                            .then(function () {
                                self.getTrackId(track)
                                    .then(function (getTResponse2) {
                                        console.log(getTResponse2);

                                        let data = {
                                            trackId: getTResponse2[0].id,
                                            playlistId: playlistId
                                        }

                                        $http.post('/music/track_playlist', data)
                                            .then(function (response) {
                                                self.getTracksInPlaylist(data.playlistId);
                                                console.log(response);
                                            })
                                            .catch(function (err) {
                                                console.log(err);
                                            });
                                    })
                            })
                            .catch(function (err) {
                                console.log(err);

                            })

                    } else {
                        let data = {
                            trackId: getTResponse[0].id,
                            playlistId: playlistId
                        }
            
                        console.log(track);
            
            
                        $http.post('/music/track_playlist', data)
                            .then(function (response) {
                                self.getTracksInPlaylist(data.playlistId);
                                console.log(response);
                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    return false;

                });
        } else {

            let data = {
                trackId: track.id,
                playlistId: playlistId
            }

            console.log(track);


            $http.post('/music/track_playlist', data)
                .then(function (response) {
                    self.getTracksInPlaylist(data.playlistId);
                    console.log(response);
                })
                .catch(function (err) {
                    console.log(err);
                });

            console.log('lol');

        }
    }









    self.getTrackId = function (track) {
        console.log(track);

        return $http.get(`/music/track/${track.id}`)
            .then(function (response) {
                console.log(response);
                return response.data;

            })
            .catch(function (err) {
                console.log(err);
                return false;

            })
    }


    self.getTracksInPlaylist = function (playlistId) {
        $http.get(`/music/track_playlist/${playlistId}`)
            .then(function (response) {

                self.currentPlaylist.list = response.data;
                console.log(response);

            })
            .catch(function (err) {
                console.log(err);

            })

    }

    self.removeFromPlaylist = function (trackId, playlistId) {
        console.log(playlistId);

        let data = {
            trackId: trackId,
            playlistId: playlistId
        }

        $http.delete(`/music/track_playlist/${data.trackId}/${data.playlistId}`)
            .then(function (response) {
                console.log(response);
                self.getTracksInPlaylist(data.playlistId);
            })
            .catch(function (err) {
                console.log(err);
            })

    }

    self.deletePlaylist = function (playlist) {

        $http.delete(`/music/playlist/${playlist.id}`)
            .then(function (response) {
                console.log(response);
                self.currentPlaylist.list = [];
                self.getPlaylists();
            })
            .catch(function (err) {
                console.log(err);
            })
    }









}]);