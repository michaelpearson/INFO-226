function BuildingsController(BuildingService, $scope) {
  this.buildings = [];

  this.$onInit = () => {
    BuildingService.getBuildingData().then((data) => this.buildings = data.buildings).then(() => $scope.$applyAsync());
  }


}
