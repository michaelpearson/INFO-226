function ProjectInfoController(ProjectService, $scope, $stateParams, AuthenticationService) {
  this.project = {};

  this.$onInit = () => {
    var projectId = $stateParams.projectId;
    ProjectService.getProjects().then(projects => this.project = projects.filter(p => p.ProjectID == projectId)[0]);
  };

  this.doComment = () => {
    this.project.Comments.push({Text: this.comment, Author: AuthenticationService.getUsername()});
    this.comment = '';
  };

}
