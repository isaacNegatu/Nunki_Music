musicApp.controller('SongPopupController', ['LibraryService','DialogService', '$sce', function (LibraryService, DialogService, $sce) {

    let self = this;

    self.playlists = LibraryService.playlists;

    self.currentTrack = DialogService.currentTrack;
    self.embedUri = DialogService.embedUri;

    self.addTrack = function(track){
        LibraryService.addTrack(track);
    }

    self.addTrackToPlaylist = function(track, playlistId){
        console.log(track);
        
        LibraryService.addToPlaylist(track, playlistId)
    }

    self.showPlaylists = function($mdMenu, ev){
        $mdMenu.open(ev);
    }

    self.trustSrc = function(src){
        return $sce.trustAsResourceUrl(src);
    }











}]);