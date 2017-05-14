var application = angular
.module('myApplication', ['ui.router'])
.controller('applicationController', function (AuthenticationService, $state, $rootScope) {
  this.loggedIn = () => AuthenticationService.isLoggedIn();
  this.dialog = document.querySelector('dialog');

  this.logout = () => {
    AuthenticationService.logout();
    $state.go('home', {}, {reload: true});
  };

  $rootScope.$on('$stateChangeError', () => {
    this.dialog.showModal();
  });

}).config(function ($stateProvider, $urlRouterProvider) {
  ConfigureRoutes($stateProvider, $urlRouterProvider);
});


// Fix MDL lifecycle
application.run(function ($rootScope, $state) {
  var observer = new MutationObserver($rootScope.$evalAsync.bind($rootScope, () => componentHandler.upgradeDom()));
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});