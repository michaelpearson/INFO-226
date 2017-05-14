var application = angular
  .module('myApplication', ['ui.router'])
  .controller('applicationController', function (AuthenticationService,$state) {
    this.loggedIn = () => AuthenticationService.isLoggedIn();
    this.logout = () => {
      AuthenticationService.logout();
      $state.go('home', {}, {reload: true});
    };
  })
  .config(function ($stateProvider, $urlRouterProvider) {
        ConfigureRoutes($stateProvider, $urlRouterProvider);
      }
  );


// Fix MDL lifecycle
application.run(function ($rootScope, $state) {
  var observer = new MutationObserver($rootScope.$evalAsync.bind($rootScope, () => componentHandler.upgradeDom()));
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  $rootScope.$on('$stateChangeError', function () {
    console.error(arguments);
    //$state.go('unauthenticated')
  });
});