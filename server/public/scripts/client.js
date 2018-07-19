let musicApp = angular.module('nunkiMusic', ['ngRoute', 'ngMaterial']);

musicApp.config(function($routeProvider){
    $routeProvider
    .when('/search', {
        templateUrl : 'views/search.html',
        controller : 'SearchController as vm'
    })
    .when('/browse', {
        templateUrl : 'views/browse.html',
        controller : 'BrowseController as vm'
    })
    .when('/myTracks', {
        templateUrl : 'views/myTracks.html',
        controller : 'MyTracksController as vm'
    })
    .when('/playlists', {
        templateUrl : 'views/playlists.html',
        controller : 'PlaylistsController as vm'
    })
    .when('/', {
        redirectTo : '/myTracks'
    })
    .otherwise({
        redirectTo : '/browse'
    })
});