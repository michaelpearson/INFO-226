function ConfigureRoutes($stateProvider, $urlRouterProvider) {
  var routes = [{
    name: 'home',
    url: '/',
    templateUrl: 'views/Home/Home.html',
    controller: HomeController,
    authenticationLevel: ['*']
  }, {
    name: 'login',
    url: '/login',
    templateUrl: 'views/Login/Login.html',
    controller: LoginController,
    authenticationLevel: ['*']
  }, {
    name: 'unauthenticated',
    url: '/loginrequired',
    templateUrl: 'views/Unauthenticated/unauthenticated.html',
    authenticationLevel: ['*']
  }, {
    name: 'buildings',
    url: '/buildings',
    templateUrl: 'views/Buildings/Buildings.html',
    controller: BuildingsController,
    authenticationLevel: [MANAGER, OWNER]
  }, {
    name: 'projectDirectory',
    url: '/projectDirectory',
    templateUrl: 'views/ProjectDirectory/ProjectDirectory.html',
    controller: ProjectDirectoryController,
    authenticationLevel: [MANAGER, OWNER]
  }, {
    name: 'projectInfo',
    url: '/projectInfo/:projectId/',
    templateUrl: 'views/ProjectInfo/ProjectInfo.html',
    controller: ProjectInfoController,
    authenticationLevel: [MANAGER, OWNER]
  }];

  $urlRouterProvider.otherwise("/");
  $stateProvider.decorator('data', function(state) {
    state.resolve = state.resolve || {};
    state.resolve.security = function ($q, AuthenticationService) {
      var required = state.authenticationLevel;
      var status = AuthenticationService.getLoginStatus();
      if (Array.isArray(required) && (required.includes('*') || required.some((e) => e == status))) {
        return;
      }
      console.log(required, status);
      return $q.reject("Not Authorized");
    };
  });

  routes.forEach((e) => e.controllerAs = "$ctrl");
  routes.forEach($stateProvider.state);

}