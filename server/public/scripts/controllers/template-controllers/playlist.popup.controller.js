musicApp.controller('PlaylistPopupController', ['$mdBottomSheet', 'LibraryService', function ($mdBottomSheet, LibraryService) {

    let self = this;

    self.playlists = LibraryService.lists;






}]);