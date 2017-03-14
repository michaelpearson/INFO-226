var application = angular
  .module('myApplication', ['ui.router'])
  .config(['$stateProvider',
      function config($stateProvider) {
        var routes = [{
          name: 'home',
          url: '',
          template: '<home></home>'
        }, {
          name: 'login',
          url: '/login',
          template: '<login></login>'
        }, {
          name: 'buildings',
          url: '/buildings',
          template: '<buildings></buildings>'
        }];

        routes.forEach($stateProvider.state);
      }
    ]
  );

//window.location.hash = '';