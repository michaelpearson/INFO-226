function ProjectInfoController(ProjectService, $scope, $stateParams, AuthenticationService, $state) {
  this.project = {};

  this.$onInit = () => {
    var projectId = $stateParams.projectId;
    ProjectService.getProject(projectId).then(p => this.project = p);
  };

  this.doComment = () => {
    this.project.Comments.push({Text: this.comment, Author: AuthenticationService.getUsername()});
    this.comment = '';
  };

  this.doArchive = () => {
    this.project.Status = 'archived';
    $state.go('projectDirectory', {
      buildingId: this.project.BuildingID
    });
    ProjectService.save(this.project);
  }

}
