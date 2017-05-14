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
    abstract: true,
    url: '/buildings',
    template: '<div ui-view></div>',
    authenticationLevel: ['*']
  }, {
    name: 'buildings.directory',
    url: '/directory',
    templateUrl: 'views/Buildings/Directory/Directory.html',
    controller: BuildingDirectoryController,
    resolve: {
      buildings : function (BuildingService) {
        return BuildingService.getBuildingData();
      }
    },
    authenticationLevel: ['*']
  }, {
    name: 'buildings.view',
    url: '/view/:buildingId/',
    templateUrl: 'views/Buildings/View/View.html',
    controller: BuildingViewController,
    resolve : {
      building : function (BuildingService, $stateParams) {
        return BuildingService.getBuilding($stateParams.buildingId);
      },
      projects : function (ProjectService, $stateParams) {
        return ProjectService.getProjectsForBuilding($stateParams.buildingId);
      }
    },
    authenticationLevel: ['*']
  }, {
    name: 'buildings.edit',
    url: '/edit/:buildingId/',
    templateUrl: 'views/Buildings/Edit/Edit.html',
    controller: BuildingEditController,
    resolve : {
      building : function (BuildingService, $stateParams) {
        return BuildingService.getBuilding($stateParams.buildingId);
      }
    },
    authenticationLevel: ['*']
  }, {
    name: 'buildings.projects',
    abstract: true,
    url: '/projects',
    template: '<div ui-view></div>',
    authenticationLevel: ['*']
  }, {
    name: 'buildings.projects.directory',
    url: '/:buildingId/directory/',
    templateUrl: 'views/Buildings/Projects/Directory/Directory.html',
    controller: ProjectDirectoryController,
    resolve : {
      projects : function (ProjectService, $stateParams) {
        return ProjectService.getProjectsForBuilding($stateParams.buildingId);
      }
    },
    authenticationLevel: ['*']
  }, {
    name: 'buildings.projects.view',
    url: '/view/:projectId/',
    templateUrl: 'views/Buildings/Projects/View/View.html',
    controller: ProjectViewController,
    resolve : {
      project : function (ProjectService, $stateParams) {
        return ProjectService.getProject($stateParams.projectId);
      }
    },
    authenticationLevel: [MANAGER, OWNER]
  }, {
    name: 'buildings.projects.edit',
    url: '/edit/:projectId/',
    templateUrl: 'views/Buildings/Projects/Edit/Edit.html',
    controller: ProjectEditController,
    resolve : {
      project : function (ProjectService, $stateParams) {
        return ProjectService.getProject($stateParams.projectId);
      }
    },
    authenticationLevel: [MANAGER, OWNER]
  }];

  $urlRouterProvider.otherwise("/");
  $stateProvider.decorator('data', function(state) {
    // state.resolve = state.resolve || {};
    // state.resolve.security = function ($q, AuthenticationService) {
    //   var required = state.authenticationLevel;
    //   var status = AuthenticationService.getLoginStatus();
    //   if (Array.isArray(required) && (required.includes('*') || required.some((e) => e == status))) {
    //     return;
    //   }
    //   console.log(required, status);
    //   return $q.reject("Not Authorized");
    // };
  });

  routes.forEach((e) => e.controllerAs = "$ctrl");
  routes.forEach($stateProvider.state);

}