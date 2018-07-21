musicApp.controller('MyTracksController', ['LibraryService','SpotifyService','$mdDialog' , function(LibraryService, SpotifyService, $mdDialog){
    console.log('MyTracksController is working');
    
    let self = this;

    
    self.songList = LibraryService.tracks;

    self.playlists = LibraryService.playlists;

    self.addToPlaylist = function(track){
        console.log(track);
    }

    self.viewSong = function (){
        console.log('view song clicked');
    }

    self.deleteTrack = function (track){
        LibraryService.deleteTrack(track);
    }

    self.showPlaylists = function($mdMenu, ev){
        
        $mdMenu.open(ev);
    }

   self.addTrackToPlaylist = function(trackId, playlistId){
       LibraryService.addToPlaylist(trackId, playlistId)
   }
    
    






}]);