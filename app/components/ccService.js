angular.module('ccApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider, $locationProvider){
        $routeProvider.when('/', {
            templateUrl : 'home.html',
            controller : 'HomeCtrl'
        }).when('/countries', {
            templateUrl : 'countries.html',
            controller : 'CountriesCtrl'
        }).when('/countries/:country', {
            templateUrl : 'countryDetails.html',
            controller : 'CountryDetailsCtrl'
        }).when('/error', {
            template : '<p>Error - Page Not Found</p>'
        }).otherwise('/');
    }])
    .controller('HomeCtrl', function($scope) {
       
    })
    .controller('CountriesCtrl', function($scope, $http) {
        var url = "http://api.geonames.org/countryInfoJSON?username=rsurducan";
        $http({
            cache : true,
            method : 'GET',
            url : url
        })
        .success(function(response) {
            $scope.countries = response.geonames;
        })
        .error(function() {
            alert('error');
        });   
    })
    .controller('CountryDetailsCtrl', function($scope, $http, $route) {
        var countryUrl = "http://api.geonames.org/countryInfoJSON?username=rsurducan&country=" + $route.current.params.country;
        $http({
            method : 'GET',
            url : countryUrl
        })
        .success(function(response) {
            $scope.country = response.geonames[0];
        })
        .error(function() {
            alert('error');
        });
        var neighbourUrl = "http://api.geonames.org/neighboursJSON?username=rsurducan&country=" + $route.current.params.country;
        $http({
            method : 'GET',
            url : neighbourUrl
        })
        .success(function(response) {
            $scope.neighbours = response.geonames;
        })
        .error(function() {
            alert('error');
        });
        var capitalUrl = "http://api.geonames.org/searchJSON?username=rsurducan&q=capital&style=LONG&country=" + $route.current.params.country;
        $http({
            method : 'GET',
            url : capitalUrl
        })
        .success(function(response) {
            $scope.capital = response.geonames[0];
        })
        .error(function() {
            alert('error');
        });
    });