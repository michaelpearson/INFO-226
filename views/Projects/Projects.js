function ProjectsController(ProjectService, $scope) {
  this.projects = [];

  this.$onInit = () => {
    ProjectService.getProjects().then((projects) => this.projects = data.projects).then(() => $scope.$applyAsync());
  }

  //this.logout
}
