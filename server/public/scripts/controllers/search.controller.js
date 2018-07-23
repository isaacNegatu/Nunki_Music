musicApp.controller('SearchController', ['SpotifyService', 'LibraryService', 'DialogService', function(SpotifyService, LibraryService, DialogService){

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

   self.viewSong = function (ev, track){
    DialogService.setNewTrack(ev, track);
    

}

}]);