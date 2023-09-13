angular.module('lionGator', ['ngRoute', 'angular.chips', 'ngSanitize', 'ui.tinymce']).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider, $sce) {
  $routeProvider
    .when('/', {
      templateUrl: '/templates/job-add-create.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
}
]);

angular.module('ViewJob', ['ngRoute', 'ngSanitize', 'angular.chips', 'ui.tinymce']).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: '/templates/job-view.html',
    })
    .otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
}
]);