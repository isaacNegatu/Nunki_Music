musicApp.controller('SearchController', ['SpotifyService', 'LibraryService', function(SpotifyService, LibraryService){

    let self = this;

    self.responses = SpotifyService.tracks;

    self.searchSpotify = function(searchKey){
        SpotifyService.search(searchKey);
        console.log(self.responses);   
    }

    self.refreshPlaylists = function(){
        LibraryService.getPlaylists();
    }

    self.addTrack = function(track){
        LibraryService.addTrack(track);
    }


    console.log('SearchController is working');
}]);