function ProjectViewController(project, ProjectService, AuthenticationService, $state, $scope) {
  this.project = project;
  this.canEditProject = ProjectService.canEditProject();

  this.doComment = () => {
    this.project.Comments.push({Text: this.comment, Author: AuthenticationService.getUsername()});
    this.comment = '';
    ProjectService.save(this.project);
  };

  this.doArchive = () => {
    this.project.Status = 'archived';
    ProjectService.save(this.project);
    $state.go('buildings.projects.directory', {
      buildingId: this.project.BuildingID
    });
  };

  this.doSignalProblem = () => {
    this.project.Status = 'problem';
    ProjectService.save(this.project);
    $scope.$applyAsync();
  };

  this.$onInit = () => {
    $scope.$watch(() => this.project.Works, () => {
      ProjectService.save(this.project)
    }, true);
  }

}
