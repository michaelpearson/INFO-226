function ProjectViewController(project, works, ProjectService, AuthenticationService, WorksService, $state, $scope) {
  this.project = project;
  this.works = works;

  this.canEditProject = ProjectService.canEditProject();
  this.canEditWorks = WorksService.canEditWorks();

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
    $scope.$watch(() => this.works, () => {
      for(var a = 0; a < this.works.length; a++) {
        WorksService.save(this.works[a]);
      }
    }, true);
  }

}
