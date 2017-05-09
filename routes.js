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
    name: 'buildingInfo',
    abstract: true,
    url: '/building/:id/',
    template: '<div ui-view></div>',
    resolve: {
      building: function (BuildingService, $stateParams) {
        return BuildingService.getBuilding($stateParams.id);
      },
      projects: function (ProjectService, $stateParams) {
        if($stateParams.id == 'new') return [];
        return ProjectService.getProjectsForBuilding($stateParams.id);
      }
    },
    authenticationLevel: [MANAGER, OWNER]
  }, {
    name: 'buildingInfo.view',
    url: 'view',
    templateUrl: 'views/BuildingInfo/View/View.html',
    controller: BuildingViewController,
    authenticationLevel: [MANAGER, OWNER]
  }, {
    name: 'projectDirectory',
    url: '/projectDirectory/:buildingId/',
    templateUrl: 'views/ProjectDirectory/ProjectDirectory.html',
    controller: ProjectDirectoryController,
    authenticationLevel: [MANAGER, OWNER]
  }, {
    name: 'projectInfo',
    url: '/projectInfo/:projectId/',
    templateUrl: 'views/ProjectInfo/ProjectInfo.html',
    controller: ProjectInfoController,
    authenticationLevel: [MANAGER, OWNER]
  }, {
     name: 'projectEdit',
     url: '/projectEdit/:projectId/',
     templateUrl: 'views/ProjectEdit/ProjectEdit.html',
     controller: ProjectEditController,
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