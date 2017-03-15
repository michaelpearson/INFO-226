function BuildingsController(BuildingService, $scope) {
  this.buildings = [];

  this.$onInit = () => {
    BuildingService.getBuildingData().then((buildings) => this.buildings = buildings).then(() => $scope.$applyAsync());
  }


}
