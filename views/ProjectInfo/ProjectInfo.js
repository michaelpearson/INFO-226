function ProjectInfoController(ProjectService, $scope, $stateParams) {
  this.project = {};

  this.$onInit = () => {
    var projectId = $stateParams.projectId;
    ProjectService.getProjects().then(projects => this.project = projects.filter(p => p.ProjectID == projectId)[0]);

  }
}
