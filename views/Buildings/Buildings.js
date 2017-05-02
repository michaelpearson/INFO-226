function BuildingsController(BuildingService, $scope, $state, AuthenticationService) {
  this.buildings = [];
  this.filter = '';


  this.$onInit = () => {
    BuildingService.getBuildingData().then((buildings) => this.buildings = buildings).then(() => $scope.$applyAsync());
  };

  this.logout = () => {
    AuthenticationService.logout();
  };

  this.filteredBuildings = () => {
    return this.buildings.filter(e => (e.ID + e.Owner + e.Address).toLowerCase().indexOf(this.filter.toLowerCase()) >= 0);
  };

}
