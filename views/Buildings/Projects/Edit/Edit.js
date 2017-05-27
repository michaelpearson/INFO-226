function ProjectEditController (project, ProjectService, $stateParams, $state, users) {
  this.project = project;
  this.isNew = project.ProjectID === 'new';

  if($stateParams.buildingId) {
    this.project.BuildingID = $stateParams.buildingId;
  }

  this.doUpdate = () => {
    ProjectService.save(this.project).then(() => {
      $state.go('buildings.projects.view', {
        projectId: this.project.ProjectID
      });
    });
  };

  this.managers = () => {
    return users.filter(u => u.UserType === MANAGER);
  };

  this.contractors = () => {
    return users.filter(u => u.UserType === CONTRACTOR);
  };
}