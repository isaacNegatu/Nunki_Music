musicApp.controller('MyTracksController', ['LibraryService', 'DialogService', function(LibraryService, DialogService){
    console.log('MyTracksController is working');
    
    let self = this;

    
    self.songList = LibraryService.tracks;

    self.playlists = LibraryService.playlists;


    self.viewSong = function (ev, track){
        DialogService.setNewTrack(ev, track);
        
        console.log('view song clicked');
    }

    self.deleteTrack = function (track){
        LibraryService.deleteTrack(track);
    }

    self.showPlaylists = function($mdMenu, ev){
        
        $mdMenu.open(ev);
    }

   self.addTrackToPlaylist = function(track, playlistId){
       LibraryService.addToPlaylist(track, playlistId)
   }
    
    






}]);