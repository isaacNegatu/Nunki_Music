musicApp.controller('PlaylistsController', [ 'LibraryService','DialogService', function(LibraryService, DialogService){
    console.log('PlaylistsController is working');

    let self = this;

    self.playlists = LibraryService.playlists;

    self.currentPlaylist = LibraryService.currentPlaylist;

    self.currentPlaylistTitle = '';

    self.createPlaylist = function(playlist){
        LibraryService.createPlaylist(playlist);
    }

    self.deletePlaylist = function(playlist){
        LibraryService.deletePlaylist(playlist);
    }


    self.getSongsInPlaylist = function(playlistId){

        let cp = self.playlists.list.find(function(pl){
            return playlistId == pl.id
        });

        self.currentPlaylistTitle = cp.title;



        console.log(cp);
        
        

        console.log(playlistId);
        LibraryService.getTracksInPlaylist(playlistId);
        console.log(self.currentPlaylist);
        
    }

    self.removeFromPlaylist = function(track){
        
        LibraryService.removeFromPlaylist(track.track_id, self.currentPlaylist.list[0].playlist_id);
    }

    self.viewSong = function (ev, track){
        DialogService.setNewTrack(ev, track);
    }
    console.log(self.playlists);
    
      
}]);