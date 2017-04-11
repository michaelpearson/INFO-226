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
    console.log('here');
    return this.buildings.filter(e => (e.ID + e.Owner + e.Address).indexOf(this.filter) >= 0);
  };

  setInterval(() => console.log(this.filter), 500);

}
