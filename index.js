var application = angular
.module('myApplication', ['ui.router'])
.controller('applicationController', function (AuthenticationService, $state, $rootScope, $scope) {
  this.showSpinner = false;
  this.loggedIn = () => AuthenticationService.isLoggedIn();
  this.dialog = document.querySelector('dialog');

  this.logout = () => {
    AuthenticationService.logout();
    $state.go('home', {}, {reload: true});
  };

  $rootScope.$on('$stateChangeError', () => {
    this.dialog.showModal();
  });

  $scope.$on('$stateChangeStart', (event, toState) => {
    if (toState.resolve) {
      this.showSpinner = true;
    }
  });
  $scope.$on('$stateChangeSuccess', (event, toState) => {
    if (toState.resolve) {
      this.showSpinner = false;
    }
  });

}).config(function ($stateProvider, $urlRouterProvider) {
  ConfigureRoutes($stateProvider, $urlRouterProvider);
});


// Fix MDL lifecycle
application.run(function ($rootScope) {
  var observer = new MutationObserver($rootScope.$evalAsync.bind($rootScope, () => componentHandler.upgradeDom()));
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});