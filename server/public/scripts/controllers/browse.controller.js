musicApp.controller('BrowseController', ['SpotifyService', 'LibraryService', 'DialogService', function(SpotifyService, LibraryService, DialogService){
    console.log('browse is working');

    let self = this;

    self.category= SpotifyService.category;

    self.playlists = LibraryService.playlists;

    self.selectedIndex = 0;

    self.getTracksInCategory = function(category){
        SpotifyService.getTracksInCategory(category);
    }

    self.addTrack = function(track){
        LibraryService.addTrack(track);
    }

    self.addTrackToPlaylist = function(track, playlistId){
        LibraryService.addToPlaylist(track, playlistId)
    }

    self.showPlaylists = function($mdMenu, ev){
        $mdMenu.open(ev);
    }

    self.viewSong = function (ev, track){
        DialogService.setNewTrack(ev, track);
        
        console.log('view song clicked');
    }
    

}])