(function() {
  var app = angular.module('actiondoc', [ 'ngRoute' ]);

  app.controller('HomeController', [ '$scope', '$location', function($scope, $location) {
    
    $scope.url = 'http://demo.actionherojs.com/api/showDocumentation';

    $scope.loadAPI = function() {
      var url = encodeURIComponent($scope.url);
      $location.path('/doc/'+url);
    };

  }]);

  app.controller('DocController', [ '$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $scope.documentation = [];
    $scope.url = decodeURIComponent($routeParams.url);

    $scope.loadDocumentation = function() {
      $http.get($scope.url).success(function(data) {
        // create the array of documentation
        for (var method_name in data.documentation) {
          for (var version in data.documentation[method_name]) {
            $scope.documentation.push(data.documentation[method_name][version]);
          }
        }

      });
    };

    $scope.loadDocumentation();

  }]);

  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/home', {
          templateUrl: 'partials/load.html',
          controller: 'HomeController'
        })
        .when('/doc/:url', {
          templateUrl: 'partials/documentation.html',
          controller: 'DocController'
        })
        .otherwise({
          redirectTo: '/home'
        });
    }])

})();
