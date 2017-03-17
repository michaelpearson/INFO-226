function ConfigureRoutes($stateProvider, $urlRouterProvider) {
  var routes = [{
    name: 'home',
    url: '/',
    templateUrl: 'views/Home/Home.html',
    controller: HomeController
  }, {
    name: 'login',
    url: '/login',
    templateUrl: 'views/Login/Login.html',
    controller: LoginController
  }, {
    name: 'buildings',
    url: '/buildings',
    templateUrl: 'views/Buildings/Buildings.html',
    controller: BuildingsController
  }, {
    name: 'buildingInfo',
    url: '/building/:id/info',
    templateUrl: 'views/BuildingInfo/BuildingInfo.html',
    controller: BuildingInfoController
  }];
  $urlRouterProvider.otherwise("/");
  routes.forEach((e) => e.controllerAs = "$ctrl");
  routes.forEach($stateProvider.state);

}