function ProjectDirectoryController(ProjectService, $scope, $stateParams) {
  this.projects = [];
  this.buildingId = $stateParams.buildingId;

  this.$onInit = () => {
    ProjectService.getProjects().then((projects) => this.projects = projects).then(() => $scope.$applyAsync())
  }
}
