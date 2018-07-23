musicApp.controller('BrowseController', ['SpotifyService', 'LibraryService', function(SpotifyService, LibraryService){
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
    

}])