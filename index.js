var application = angular
  .module('myApplication', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
        console.log($urlRouterProvider);
        ConfigureRoutes($stateProvider, $urlRouterProvider);
      }
  );

// Fix MDL lifecycle
application.run(function ($rootScope) {
  var observer = new MutationObserver($rootScope.$evalAsync.bind($rootScope, () => componentHandler.upgradeDom()));
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});