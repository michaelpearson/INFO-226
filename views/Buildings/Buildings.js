function BuildingsController(BuildingService, $scope, $state, AuthenticationService) {
  this.buildings = [];

  this.$onInit = () => {
    BuildingService.getBuildingData().then((buildings) => this.buildings = buildings).then(() => $scope.$applyAsync());
  };

  this.logout = () => {
    AuthenticationService.logout();
  };


}
