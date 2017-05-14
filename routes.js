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
    name: 'projectDirectory',
    url: '/projectDirectory/:buildingId/',
    templateUrl: 'views/ProjectDirectory/ProjectDirectory.html',
    controller: ProjectDirectoryController,
    authenticationLevel: ['*']
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