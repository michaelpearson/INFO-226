function WorkEditController (work, project, WorksService, $stateParams, $state) {
  this.project = project;
  this.work = work;

  /**if($stateParams.buildingId) {
    this.project.BuildingID = $stateParams.buildingId;
  }**/

  this.doUpdate = () => {
    WorksService.save(this.work).then(() => {
      $state.go('buildings.projects.view', {
        projectId: this.project.ProjectID
      });
    });
  };

  this.doRemove = () => {
    WorksService.remove(this.work).then(() => {
      $state.go('buildings.projects.view', {
        projectId: this.project.ProjectID
      });
    });
  };
}