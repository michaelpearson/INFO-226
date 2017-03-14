var application = angular
  .module('myApplication', ['ui.router'])
  .config(['$stateProvider',
      function config($stateProvider) {
        ConfigureRoutes($stateProvider);
      }
    ]
  );

//window.location.hash = '';