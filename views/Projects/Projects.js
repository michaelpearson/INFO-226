function ProjectsController(ProjectService, $scope) {
  this.projects = [];

  this.$onInit = () => {
    //need to
    ProjectService.getProjectsForBuilding( ).then((projects) => this.projects = data.projects).then(() => $scope.$applyAsync());
  }
}
