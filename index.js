var application = angular
  .module('myApplication', ['ui.router'])
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

  $rootScope.$on('$stateChangeError', () => $state.go('unauthenticated'));
});