musicApp.controller('PlaylistsController',[ 'LibraryService', function(LibraryService){
    console.log('PlaylistsController is working');

    let self = this;

    self.playlists = LibraryService.playlists;

    self.currentPlaylist = LibraryService.currentPlaylist;

    self.createPlaylist = function(playlist){
        LibraryService.createPlaylist(playlist);
    }

    self.deletePlaylist = function(playlist){
        LibraryService.deletePlaylist(playlist);
    }


    self.getSongsInPlaylist = function(playlistId){

        console.log(playlistId);
        LibraryService.getTracksInPlaylist(playlistId);
        console.log(self.currentPlaylist);
        
    }

    self.removeFromPlaylist = function(track){
        
        LibraryService.removeFromPlaylist(track.track_id, self.currentPlaylist.list[0].playlist_id);
    }

    console.log(self.playlists);
    
      
}]);