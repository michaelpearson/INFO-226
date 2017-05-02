function ProjectDirectoryController(ProjectService, $scope) {
  this.projects = [];

  this.$onInit = () => {
    ProjectService.getProjects().then((projects) => this.projects = projects).then(() => $scope.$applyAsync())
  }
}
