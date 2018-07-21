musicApp.controller('PlaylistsController',[ 'LibraryService', function(LibraryService){
    console.log('PlaylistsController is working');

    let self = this;

    self.playlists = LibraryService.playlists;

    self.currentPlaylist = LibraryService.currentPlaylist;

    self.createPlaylist = function(playlist){
        LibraryService.createPlaylist(playlist);
    }

    self.deletePlaylist = function(playlist){
        // LibraryService.deletePlaylists(playlist);
    }


    self.getSongsInPlaylist = function(playlistId){

        console.log(playlistId);
        LibraryService.getTracksInPlaylist(playlistId);
   
    }

    console.log(self.playlists);
    
      
}]);