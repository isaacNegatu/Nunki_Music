musicApp.controller('SearchController', ['SpotifyService', 'LibraryService', function(SpotifyService, LibraryService){

    let self = this;

    self.responses = SpotifyService.tracks;

    self.playlists = LibraryService.playlists;


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

    self.showPlaylists = function($mdMenu, ev){
        $mdMenu.open(ev);
    }

   self.addTrackToPlaylist = function(track, playlistId){
       LibraryService.addToPlaylist(track, playlistId)
   }

    


    console.log('SearchController is working');
}]);