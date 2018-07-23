musicApp.service('DialogService', ['$mdDialog', 'SpotifyService','$sce', function ($mdDialog, SpotifyService) {

    console.log('dialog service is on');

    let self = this;

    self.currentTrack = {
        track: [],
        trackWithInfo: [],
        artistWithInfo : []
    };

    self.embedUri = {
        uri :[]
    };

    self.setNewTrack = function (ev, track) {
        self.currentTrack.track[0] = track;
        console.log(self.currentTrack.track[0]);

        self.getAllInfo(ev, track);
    }


    self.getAllInfo = function (ev, track) {
        let url = '';
       
        
        if (track.album) {
            url = track.href;
        } else {
            url = track.track_api_url
        }

        SpotifyService.getTrack(url)
            .then(function (trackRes) {
                self.currentTrack.trackWithInfo[0] = trackRes;



                self.embedUri.uri[0] = `https://open.spotify.com/embed?uri=${trackRes.uri}`;

                console.log(trackRes);
                


                SpotifyService.getArtist(trackRes.artists[0].href)
                    .then(function(artistRes){
                        self.currentTrack.artistWithInfo[0] = artistRes;
                        console.log(self.currentTrack.artistWithInfo);
                        
                        $mdDialog.show({
                            templateUrl: 'views/templates/song.popup.html',
                            parent: angular.element(document.querySelector('#popupContainer')),
                            targetEvent: ev,
                            clickOutsideToClose: true
                        })
                    })
                    .catch(function(err){

                    })
                
                
            })
            .catch(function (err) {

            })



    }





}]);