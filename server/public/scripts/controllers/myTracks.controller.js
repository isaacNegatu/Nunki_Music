musicApp.controller('MyTracksController', ['LibraryService','SpotifyService' , function(LibraryService, SpotifyService){
    console.log('MyTracksController is working');
    
    let self = this;

    
    self.songList = LibraryService.tracks;

    self.addToPlaylist = function(track){
        console.log(track);
    }

    self.viewSong = function (){
        console.log('view song clicked');
    }
    
    






}]);