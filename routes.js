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
    name: 'buildings',
    abstract: true,
    url: '/buildings',
    template: '<div ui-view></div>',
    authenticationLevel: [OWNER, MANAGER, CONTRACTOR]
  }, {
    name: 'buildings.directory',
    url: '/directory',
    templateUrl: 'views/Buildings/Directory/Directory.html',
    controller: BuildingDirectoryController,
    resolve: {
      buildings : (BuildingService) => BuildingService.getBuildingData()
    },
    authenticationLevel: [OWNER, MANAGER, CONTRACTOR]
  }, {
    name: 'buildings.view',
    url: '/view/:buildingId/',
    templateUrl: 'views/Buildings/View/View.html',
    controller: BuildingViewController,
    resolve : {
      building : (BuildingService, $stateParams) => BuildingService.getBuilding($stateParams.buildingId),
      projects : (ProjectService, $stateParams) => ProjectService.getProjectsForBuilding($stateParams.buildingId)
    },
    authenticationLevel: [OWNER, MANAGER, CONTRACTOR]
  }, {
    name: 'buildings.edit',
    url: '/edit/:buildingId/',
    templateUrl: 'views/Buildings/Edit/Edit.html',
    controller: BuildingEditController,
    resolve : {
      building : (BuildingService, $stateParams) => BuildingService.getBuilding($stateParams.buildingId),
      users : (UserService) => UserService.getUserList()
    },
    authenticationLevel: [OWNER, MANAGER, CONTRACTOR]
  }, {
    name: 'buildings.projects',
    abstract: true,
    url: '/projects',
    template: '<div ui-view></div>',
    authenticationLevel: [OWNER, MANAGER, CONTRACTOR]
  }, {
    name: 'buildings.projects.directory',
    url: '/:buildingId/directory/',
    templateUrl: 'views/Buildings/Projects/Directory/Directory.html',
    controller: ProjectDirectoryController,
    resolve : {
      projects : (ProjectService, $stateParams) => ProjectService.getProjectsForBuilding($stateParams.buildingId)
    },
    authenticationLevel: [OWNER, MANAGER, CONTRACTOR]
  }, {
    name: 'buildings.projects.view',
    url: '/view/:projectId/',
    templateUrl: 'views/Buildings/Projects/View/View.html',
    controller: ProjectViewController,
    resolve : {
      project : (ProjectService, $stateParams) => ProjectService.getProject($stateParams.projectId),
      works : (WorksService, $stateParams) => WorksService.getWorksByProject($stateParams.projectId)
    },
    authenticationLevel: [OWNER, MANAGER, CONTRACTOR]
  }, {
     name: 'buildings.projects.edit',
     url: '/edit/:projectId/',
     templateUrl: 'views/Buildings/Projects/Edit/Edit.html',
     controller: ProjectEditController,
     resolve : {
       project : (ProjectService, $stateParams) => ProjectService.getProject($stateParams.projectId),
       users : (UserService) => UserService.getUserList()
     },
     authenticationLevel: [OWNER, MANAGER, CONTRACTOR]
   }, {
     name: 'buildings.projects.new',
     url: '/edit/:projectId/buildingId/:buildingId',
     templateUrl: 'views/Buildings/Projects/Edit/Edit.html',
     controller: ProjectEditController,
     resolve : {
       project : (ProjectService, $stateParams) => ProjectService.getProject($stateParams.projectId)
     },
     authenticationLevel: [OWNER, MANAGER, CONTRACTOR]
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
      return $q.reject("Not Authorized");
    };
  });

  routes.forEach((e) => e.controllerAs = "$ctrl");
  routes.forEach($stateProvider.state);

}