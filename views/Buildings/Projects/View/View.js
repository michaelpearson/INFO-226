function ProjectViewController(project, works, ProjectService, AuthenticationService, $state) {
  this.project = project;
  this.works = works;

  this.doComment = () => {
    this.project.Comments.push({Text: this.comment, Author: AuthenticationService.getUsername()});
    this.comment = '';
    ProjectService.save(this.project);
  };

  this.doArchive = () => {
    this.project.Status = 'archived';
    $state.go('buildings.projects.Directory', {
      buildingId: this.project.BuildingID
    });
    ProjectService.save(this.project);
  }
}
