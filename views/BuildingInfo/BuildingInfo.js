function BuildingInfoController(ProjectService, BuildingService, $scope, $stateParams, $state) {
  this.buildingId = 0;
  this.projects = [];
  this.building = {};
  this.loading = false;

  this.$onInit = () => {
    this.buildingId = $stateParams.id;
    this.loading = true;
    ProjectService.getProjectsForBuilding()
      .then((projects) => this.projects = projects)
      .then(() => this.loading = false)
      .then(() => $scope.$applyAsync());

    BuildingService.getBuilding(this.buildingId)
      .then((building) => this.building = building)
      .catch(() => this.buildingNotFound())
      .then(() => $scope.$applyAsync());

  };

  this.buildingNotFound = () => {
    console.log('Building not found!');
    $state.go('home');
  };


}
